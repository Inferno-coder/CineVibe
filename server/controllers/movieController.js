import axios from "axios";
import Movie from "../models/Movie.js";

// Sync Movies from TMDB
export const syncMoviesFromTMDB = async (req, res) => {
  try {
    const tmdbToken = process.env.TMDB_TOKEN;
    if (!tmdbToken) {
      return res.status(500).json({ success: false, message: "TMDB Token not found in .env" });
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${tmdbToken}`,
      },
    };

    // 1. Get Popular Movies
    const { data: popularData } = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );

    const moviesToSync = popularData.results.slice(0, 10); // Sync first 10 for now
    const syncedMovies = [];

    for (const basicMovie of moviesToSync) {
      // 2. Get Details & Credits for each movie
      const [detailsRes, creditsRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${basicMovie.id}?language=en-US`, options),
        axios.get(`https://api.themoviedb.org/3/movie/${basicMovie.id}/credits?language=en-US`, options),
      ]);

      const details = detailsRes.data;
      const credits = creditsRes.data;

      const movieData = {
        tmdbId: details.id,
        title: details.title,
        overview: details.overview,
        poster_path: `https://image.tmdb.org/t/p/original${details.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/original${details.backdrop_path}`,
        genres: details.genres,
        casts: credits.cast.slice(0, 10).map((c) => ({
          name: c.name,
          profile_path: c.profile_path ? `https://image.tmdb.org/t/p/original${c.profile_path}` : null,
        })),
        release_date: details.release_date,
        original_language: details.original_language,
        tagline: details.tagline,
        vote_average: details.vote_average,
        vote_count: details.vote_count,
        runtime: details.runtime,
      };

      // 3. Upsert into MongoDB
      const updatedMovie = await Movie.findOneAndUpdate(
        { tmdbId: movieData.tmdbId },
        movieData,
        { upsert: true, new: true }
      );
      syncedMovies.push(updatedMovie);
    }

    res.json({ success: true, message: `Synced ${syncedMovies.length} movies`, movies: syncedMovies });
  } catch (error) {
    console.log("TMDB Sync Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new movie manually
export const addMovie = async (req, res) => {
  try {
    const {
      tmdbId,
      title,
      overview,
      poster_path,
      backdrop_path,
      genres,
      casts,
      release_date,
      original_language,
      tagline,
      vote_average,
      vote_count,
      runtime,
    } = req.body;

    const movie = new Movie({
      tmdbId,
      title,
      overview,
      poster_path,
      backdrop_path,
      genres,
      casts,
      release_date,
      original_language,
      tagline,
      vote_average,
      vote_count,
      runtime,
    });

    await movie.save();
    res.json({ success: true, message: "Movie added successfully", movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json({ success: true, movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get movie by TMDB ID (with auto-sync from TMDB if not in local DB)
export const getMovieByTmdbId = async (req, res) => {
  try {
    const tmdbId = Number(req.params.tmdbId);
    const tmdbToken = process.env.TMDB_TOKEN;

    if (!tmdbId) {
      return res.status(400).json({ success: false, message: "Invalid TMDB ID" });
    }

    // 1. Check if movie exists in local MongoDB
    let movie = await Movie.findOne({ tmdbId });

    if (!movie) {
      console.log(`Movie ${tmdbId} not found in DB. Fetching from TMDB...`);
      
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${tmdbToken}`,
        },
      };

      try {
        const [detailsRes, creditsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US`, options),
          axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?language=en-US`, options),
        ]);

        const details = detailsRes.data;
        const credits = creditsRes.data;

        console.log(`Fetched details for: ${details.title}`);

        const movieData = {
          tmdbId: details.id,
          title: details.title || "Untitled Movie",
          overview: details.overview || "No overview available.",
          poster_path: details.poster_path ? `https://image.tmdb.org/t/p/original${details.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster",
          backdrop_path: details.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : null,
          genres: details.genres || [],
          casts: credits.cast ? credits.cast.slice(0, 10).map((c) => ({
            name: c.name,
            profile_path: c.profile_path ? `https://image.tmdb.org/t/p/original${c.profile_path}` : null,
          })) : [],
          release_date: details.release_date || new Date().toISOString().split("T")[0],
          original_language: details.original_language || "en",
          tagline: details.tagline || "",
          vote_average: details.vote_average || 0,
          vote_count: details.vote_count || 0,
          runtime: details.runtime || 0,
        };

        console.log(`Upserting ${movieData.title} to MongoDB...`, movieData);
        try {
          movie = await Movie.findOneAndUpdate({ tmdbId: movieData.tmdbId }, movieData, { upsert: true, new: true, runValidators: true });
          console.log(`Successfully synced ${movie.title}`);
        } catch (dbError) {
          console.error("Database Sync Error (Mongoose):", dbError.message);
          return res.status(500).json({ 
            success: false, 
            message: "Database error during movie sync", 
            error: dbError.message,
            fields: dbError.errors ? Object.keys(dbError.errors) : []
          });
        }
      } catch (tmdbError) {
        console.error("TMDB API Error:", tmdbError.response?.data || tmdbError.message);
        return res.status(502).json({ 
          success: false, 
          message: "Failed to fetch data from TMDB API", 
          error: tmdbError.message 
        });
      }
    }

    res.json({ success: true, movie });
  } catch (error) {
    console.log("Get Movie by TMDB ID Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
