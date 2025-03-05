import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductImages, getProducts, getSingleProduct } from '../controllers/productController.js';

const router = express.Router();

router.get("/", getProducts);
router.get("/all", getAllProducts);
router.post("/new", createProduct);
router.get("/:productId", getSingleProduct);
router.get("/:productId/images", getProductImages);
router.delete("/:productId", deleteProduct);

export default router;