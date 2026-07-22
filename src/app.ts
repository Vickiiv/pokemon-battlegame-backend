import { env } from "./config/env.ts";
import { connectToDatabase } from "./config/db.ts";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
  await connectToDatabase();

  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

start();
