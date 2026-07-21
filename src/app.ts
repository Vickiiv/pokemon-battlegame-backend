import mongoose from "mongoose";
import express from "express";

const mongoUri = process.env.MONGO_URI;
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("The server running on Port 3000");
});

if (mongoUri === undefined) {
  throw new Error("MONGO_URI is missing from .env");
}

const connect = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Connection Failed!", error);
  }
};

connect();
