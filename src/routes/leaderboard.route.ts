import express from "express";
import {
  createScore,
  getLeaderboard,
} from "../controllers/leaderboard.controller.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.get("/", requireAuth, getLeaderboard);
router.post("/", requireAuth, createScore);

export default router;
