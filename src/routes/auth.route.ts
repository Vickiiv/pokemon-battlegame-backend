import express from "express";
import { register, login, me, logout } from "../controllers/auth.controller.ts";
import { requireAuth } from "../middlewares/auth.middleware.ts";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.ts";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/me", requireAuth, asyncHandler(me));
router.post("/logout", logout);

export default router;
