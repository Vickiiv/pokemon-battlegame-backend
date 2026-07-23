import express from "express";
import {
  getRoster,
  addPokemon,
  removePokemon,
} from "../controllers/roster.controller.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.ts";

const router = express.Router();

router.get("/", requireAuth, asyncHandler(getRoster));
router.post("/", requireAuth, asyncHandler(addPokemon));
router.delete("/:pokemonId", requireAuth, asyncHandler(removePokemon));

export default router;
