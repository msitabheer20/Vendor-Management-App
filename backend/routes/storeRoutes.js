import express from "express";
import { getStores, saveStore, deleteStore } from "../controllers/storeController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/",authMiddleware, getStores);
router.post("/",authMiddleware, saveStore);
router.delete("/:id",authMiddleware, deleteStore);

export default router;
