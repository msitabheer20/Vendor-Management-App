import express from "express";
import { approveVendor, getPendingUsers, getVedorDetails, rejectVendor } from "../controllers/vendorController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getVedorDetails);
router.get("/pending",authMiddleware, getPendingUsers);
router.put("/pending/:id", authMiddleware, approveVendor);
router.delete("/pending/:id",authMiddleware, rejectVendor);

export default router;
