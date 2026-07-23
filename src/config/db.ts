import mongoose from "mongoose";
import { env } from "./env.ts";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("🟢 mit MongoDB verbunden");
  } catch (error) {
    console.log("🔴 Datenbankverbindung fehlgeschlagen: ", error);
    process.exit(1);
  }
};
