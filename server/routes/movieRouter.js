import express from "express";
import { addMovie, getMovies, getMovieById, syncMoviesFromTMDB, getMovieByTmdbId } from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.get("/sync-tmdb", syncMoviesFromTMDB);
movieRouter.get("/tmdb/:tmdbId", getMovieByTmdbId);
movieRouter.post("/add", addMovie);
movieRouter.get("/list", getMovies);
movieRouter.get("/:id", getMovieById);

export default movieRouter;
