import express from "express";
import { getVedorDetails } from "../controllers/vendorController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getVedorDetails);

export default router;
