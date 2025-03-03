import express from 'express'
import { createProduct, deleteProduct, getProductImages, getProducts, getSingleProduct } from '../controllers/productController.js';

const router = express.Router();

router.get("/", getProducts);
router.post("/new", createProduct);
router.get("/:productId", getSingleProduct);
router.get("/:productId/images", getProductImages);
router.delete("/:productId", deleteProduct);

export default router;