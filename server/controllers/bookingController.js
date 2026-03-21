import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Get all bookings for a specific user
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookings = await Booking.find({ userId })
      .populate("showId")
      .populate("movieId");
    
    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Fetch Bookings Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all bookings (Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("showId")
      .populate("movieId")
      .populate({
         path: 'userId',
         model: 'User',
         select: 'name email'
      });
    
    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Fetch All Bookings Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Booking Stats (Admin)
export const getStats = async (req, res) => {
  try {
    const [moviesCount, showsCount, bookingsCount, usersCount, revenueData] = await Promise.all([
      Movie.countDocuments(),
      Show.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments(),
      Booking.aggregate([
        { $match: { status: "Confirmed" } },
        { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
      ])
    ]);

    res.json({
      success: true,
      stats: {
        moviesCount,
        showsCount,
        bookingsCount,
        usersCount,
        totalRevenue: revenueData[0]?.totalRevenue || 0
      }
    });
  } catch (error) {
    console.error("Fetch Stats Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete/Cancel Booking (Admin)
export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Release seats in the show
    const show = await Show.findById(booking.showId);
    if (show) {
      booking.selectedSeats.forEach(seat => {
        delete show.occupiedSeats[seat];
      });
      show.markModified("occupiedSeats");
      await show.save();
    }

    await Booking.findByIdAndDelete(bookingId);
    
    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Delete Booking Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Stripe Checkout Session
export const createStripeSession = async (req, res) => {
  try {
    const { showId, userId, selectedSeats, amount, movieTitle } = req.body;
    const origin = req.get('origin');

    // Pre-check availability
    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ success: false, message: "Show not found" });

    const isAlreadyOccupied = selectedSeats.some(seat => show.occupiedSeats[seat]);
    if (isAlreadyOccupied) {
      return res.status(400).json({ success: false, message: "Some seats are already booked" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${movieTitle} - Ticket Booking`,
              description: `Seats: ${selectedSeats.join(", ")}`,
            },
            unit_amount: amount * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/verify-payment?success=true&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/verify-payment?success=false&sessionId={CHECKOUT_SESSION_ID}`,
      metadata: {
        showId,
        userId,
        selectedSeats: JSON.stringify(selectedSeats),
        amount: amount.toString(),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Session Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper to finalize booking after payment is confirmed
const finalizeBooking = async (session) => {
  const { showId, userId, selectedSeats, amount } = session.metadata;
  const parsedSeats = JSON.parse(selectedSeats);
  const paymentId = session.id;

  // Check if booking already exists (Idempotency)
  const existingBooking = await Booking.findOne({ paymentId });
  if (existingBooking) return existingBooking;

  const show = await Show.findById(showId);
  if (!show) throw new Error("Show not found");

  // Final availability check before saving
  const isAlreadyOccupied = parsedSeats.some(seat => show.occupiedSeats[seat]);
  if (isAlreadyOccupied) {
    throw new Error("Seats already booked by someone else during checkout");
  }

  // 1. Block Seats
  parsedSeats.forEach((seat) => {
    show.occupiedSeats[seat] = { userId, bookedAt: new Date() };
  });
  show.markModified("occupiedSeats");
  await show.save();

  // 2. Create Booking Record
  const newBooking = new Booking({
    showId,
    userId,
    movieId: show.movie,
    selectedSeats: parsedSeats,
    amount: parseInt(amount),
    paymentId: paymentId,
    status: "Confirmed",
  });
  await newBooking.save();

  return newBooking;
};

// Verify Stripe Payment and Finalize Booking (Frontend Redirect Handler)
export const verifyStripePayment = async (req, res) => {
  try {
    const { sessionId, success } = req.body;

    if (success === "false") {
       return res.json({ success: false, message: "Payment cancelled" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const booking = await finalizeBooking(session);
      res.json({ success: true, message: "Booking confirmed!", bookingId: booking._id });
    } else {
      res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    console.error("Stripe Verification Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stripe Webhook Handler
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      await finalizeBooking(session);
      console.log(`Booking finalized via Webhook for Session: ${session.id}`);
    } catch (err) {
      console.error(`Webhook Finalization Error: ${err.message}`);
    }
  }

  res.json({ received: true });
};
