import Show from "../models/Show.js";
import Movie from "../models/Movie.js";
import mongoose from "mongoose";

// Add a new show
export const addShow = async (req, res) => {
  try {
    const { movie, time, date, showDateTime, showPrice } = req.body;

    const show = new Show({
      movie,
      time,
      date,
      showDateTime,
      showPrice,
      occupiedSeats: {}, // New show starts with no occupied seats
    });

    await show.save();
    res.json({ success: true, message: "Show added successfully", show });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all shows
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({}).populate("movie");
    res.json({ success: true, shows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get shows for a specific movie (Supports both Mongo _id and tmdbId)
export const getShowsByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params;
    let movieObjectId = movieId;

    // Check if movieId is NOT a valid MongoDB ObjectId (likely a tmdbId)
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      const movie = await Movie.findOne({ tmdbId: Number(movieId) });
      if (movie) {
        movieObjectId = movie._id;
      } else {
        // If movie not in our DB, it definitely has no shows yet
        return res.json({ success: true, shows: [] });
      }
    }

    const shows = await Show.find({ movie: movieObjectId }).populate("movie");
    res.json({ success: true, shows });
  } catch (error) {
    console.error("Get Shows Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get show by ID
export const getShowById = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findById(id).populate("movie");
    if (!show) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }
    res.json({ success: true, show });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
