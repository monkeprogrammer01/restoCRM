import express from "express";
import { signup, login, profile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../lib/utils.js";

const router = express.Router()

// Sign up 
router.post("/signup", signup)

// Sign in
router.post("/login", login)

// Log out
// router("/logout", )

router.get("/profile", authMiddleware, profile)
export default router;