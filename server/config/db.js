import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectDB;
