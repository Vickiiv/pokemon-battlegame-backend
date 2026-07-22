import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.ts";
import { registerSchema, loginSchema } from "../schemas/auth.schema.ts";
import { env } from "../config/env.ts";

export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
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

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
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

  res.status(200).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
};
