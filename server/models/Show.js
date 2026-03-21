import mongoose from "mongoose";

const ShowSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "movie", required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  showDateTime: { type: Number, required: true },
  showPrice: { type: Number, required: true },
  occupiedSeats: { type: Object, default: {} },
}, { timestamps: true, minimize: false });

const Show = mongoose.models.show || mongoose.model("show", ShowSchema);

export default Show;
