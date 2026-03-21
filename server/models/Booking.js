import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    showId: { type: mongoose.Schema.Types.ObjectId, ref: "show", required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
    seats: { type: Array, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Confirmed" },
  },
  { timestamps: true }
);

const Booking = mongoose.models.booking || mongoose.model("booking", BookingSchema);

export default Booking;
