import { env } from "./config/env.ts";
import { connectToDatabase } from "./config/db.ts";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.ts";
import cookieParser from "cookie-parser";
import leaderboardRoutes from "./routes/leaderboard.route.ts";

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/leaderboard", leaderboardRoutes);

const start = async () => {
  await connectToDatabase();

  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

start();
