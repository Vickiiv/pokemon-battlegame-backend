import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";
import { Score } from "../models/score.model.ts";
import { createScoreSchema } from "../schemas/leaderboard.schema.ts";
import { z } from "zod";

export const getLeaderboard = async (req: AuthRequest, res: Response) => {
  const scores = await Score.find()
    .sort({ score: -1 })
    .limit(20)
    .populate("userId", "name");

  res.status(200).json(scores);
};

export const createScore = async (req: AuthRequest, res: Response) => {
  const result = createScoreSchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ errors: z.flattenError(result.error).fieldErrors });
  }

  const newScore = await Score.create({
    userId: req.userId,
    score: result.data.score,
  });

  res.status(201).json(newScore);
};
