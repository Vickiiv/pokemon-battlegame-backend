import mongoose from "mongoose";
import { env } from "./env.ts";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("🟢 Connected to MongoDB");
  } catch (error) {
    console.log("🔴 Database connection failed:", error);
    process.exit(1);
  }
};
