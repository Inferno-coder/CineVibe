import express from "express";
import { addShow, getShows, getShowsByMovieId, getShowById } from "../controllers/showController.js";

const showRouter = express.Router();

showRouter.post("/add", addShow);
showRouter.get("/list", getShows);
showRouter.get("/movie/:movieId", getShowsByMovieId);
showRouter.get("/:id", getShowById);

export default showRouter;
