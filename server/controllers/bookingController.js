import Booking from "../models/Booking.js";

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
