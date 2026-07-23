import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.ts";
import { registerSchema, loginSchema } from "../schemas/auth.schema.ts";
import { env } from "../config/env.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import { z } from "zod";

//  Registrieren
export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ errors: z.flattenError(result.error).fieldErrors });
  }

  const { name, email, password } = result.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "E-Mail wird bereits verwendet." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });

  res.status(201).json({
    message: "Registrierung erfolgreich.",
    user: { id: user._id, name: user.name, email: user.email },
  });
};

//  Login
export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ errors: z.flattenError(result.error).fieldErrors });
  }

  const { email, password } = result.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "E-Mail oder Passwort falsch." });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ message: "E-Mail oder Passwort falsch." });
  }

  const token = jwt.sign({ userId: user._id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: !env.isDevelopment,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({
    user: { id: user._id, name: user.name, email: user.email },
  });
};

export const me = async (req: AuthRequest, res: Response) => {
  res.status(200).json({ userId: req.userId });
};

// Logout

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: !env.isDevelopment,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Erfolgreich ausgeloggt" });
};
