import express from "express";
import { getUserData, toggleFavorite } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/get-user-data", getUserData);
userRouter.post("/toggle-favorite", toggleFavorite);

export default userRouter;
