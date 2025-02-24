import express from "express";
import { getStores, saveStore, deleteStore } from "../controllers/storeController.js";

const router = express.Router();

router.get("/", getStores);
router.post("/", saveStore);
router.delete("/:id", deleteStore);

export default router;
