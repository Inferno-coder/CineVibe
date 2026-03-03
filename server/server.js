import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inggest/index.js";
// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// API Endpoints
app.get("/", (req, res) => {
  res.send("Server is Live");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
// Listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
