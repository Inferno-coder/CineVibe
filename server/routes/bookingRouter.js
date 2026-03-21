import express from "express";
import { getUserBookings, getAllBookings, getStats, deleteBooking, createStripeSession, verifyStripePayment, stripeWebhooks } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/user", getUserBookings);
bookingRouter.get("/list", getAllBookings);
bookingRouter.get("/stats", getStats);
bookingRouter.post("/delete", deleteBooking);
bookingRouter.post("/create-checkout", createStripeSession);
bookingRouter.post("/verify-payment", verifyStripePayment);
bookingRouter.post("/webhook", stripeWebhooks);

export default bookingRouter;
