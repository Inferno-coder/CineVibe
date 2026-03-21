import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  role: { type: String, default: "user" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
});

const User = mongoose.model("User", UserSchema);

export default User;
