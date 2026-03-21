import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks } from "./controllers/webhookController.js";
import userRouter from "./routes/userRouter.js";
import movieRouter from "./routes/movieRouter.js";
import showRouter from "./routes/showRouter.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(cors());
app.use(clerkMiddleware());

// API Endpoints
app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.post("/api/webhooks/clerk", clerkWebhooks);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/show", showRouter);

// Listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
