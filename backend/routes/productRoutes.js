import express from 'express'
import { createProduct, getProducts } from '../controllers/productController';

const router = express.Router();

router.get("/", getProducts);
router.post("/new", createProduct);

export default router;