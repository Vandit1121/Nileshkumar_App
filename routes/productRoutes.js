import express from "express";
import { addNewProduct, productDetails } from "../controllers/productController.js";

const router = express.Router();

router.post("/add-product",addNewProduct);
router.post("/fetch-all-products",productDetails);

export default router;