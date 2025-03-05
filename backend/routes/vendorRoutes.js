import express from "express";
import { approveVendor, getPendingUsers, getVedorDetails } from "../controllers/vendorController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getVedorDetails);
router.get("/pending", getPendingUsers);
router.put("/pending/:id", approveVendor)
router.delete("/pending/:id", )

export default router;
