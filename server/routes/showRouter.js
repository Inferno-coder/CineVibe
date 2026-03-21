import express from "express";
import { addShow, getShows, getShowsByMovieId, getShowById, bookSeats, deleteShow } from "../controllers/showController.js";

const showRouter = express.Router();

showRouter.post("/add", addShow);
showRouter.get("/list", getShows);
showRouter.get("/movie/:movieId", getShowsByMovieId);
showRouter.get("/:id", getShowById);
showRouter.post("/book", bookSeats);
showRouter.post("/delete", deleteShow);

export default showRouter;
