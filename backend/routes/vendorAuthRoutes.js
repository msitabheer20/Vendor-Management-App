import express from "express";
import { handleSignin, handleSignUp } from "../controllers/authController.js";
const router = express.Router();

// Vendor Signup
router.post("/signup", handleSignUp);

// Vendor Login
router.post("/signin", handleSignin);

export default router;
