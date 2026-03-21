import express from "express";
import { getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/get-user-data", getUserData);

export default userRouter;
