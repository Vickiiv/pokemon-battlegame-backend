import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.ts";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("🔴 Unerwarteter Fehler:", err);

  res.status(500).json({
    message:
      "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.",
    ...(env.isDevelopment && { error: err.message }),
  });
};
