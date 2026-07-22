import { env } from "./config/env.ts";
import { connectToDatabase } from "./config/db.ts";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

const start = async () => {
  await connectToDatabase();

  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

start();
