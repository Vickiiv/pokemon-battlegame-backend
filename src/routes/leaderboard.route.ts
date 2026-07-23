import express from "express";
import {
  createScore,
  getLeaderboard,
} from "../controllers/leaderboard.controller.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.ts";

const router = express.Router();

router.get("/", requireAuth, asyncHandler(getLeaderboard));
router.post("/", requireAuth, asyncHandler(createScore));

export default router;
