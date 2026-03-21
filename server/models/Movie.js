import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  poster_path: { type: String, required: true },
  backdrop_path: { type: String },
  genres: { type: Array, required: true },
  casts: { type: Array },
  release_date: { type: String, required: true },
  original_language: { type: String, default: "en" },
  tagline: { type: String },
  vote_average: { type: Number, default: 0 },
  vote_count: { type: Number, default: 0 },
  runtime: { type: Number, required: true },
}, { timestamps: true });

const Movie = mongoose.models.movie || mongoose.model("movie", MovieSchema);

export default Movie;
