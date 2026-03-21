import express from "express";
import { getUserBookings, getAllBookings } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/user", getUserBookings);
bookingRouter.get("/list", getAllBookings);

export default bookingRouter;
