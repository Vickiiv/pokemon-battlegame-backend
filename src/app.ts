import { env } from "./config/env.ts";
import { connectToDatabase } from "./config/db.ts";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.ts";
import cookieParser from "cookie-parser";
import leaderboardRoutes from "./routes/leaderboard.route.ts";
import { notFoundHandler } from "./middlewares/notFound.middleware.ts";
import { errorHandler } from "./middlewares/error.middleware.ts";

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

app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();

  app.listen(env.port, () => {
    console.log(`🚀 Server läuft auf Port ${env.port}`);
  });
};

start();
