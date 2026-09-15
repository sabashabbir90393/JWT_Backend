import express from "express";
import {
  deleteProductController,
  getProductsController,
  saveProductController,
  updateProductController,
} from "../Controller/product.js";

const router = express.Router();

router.get("/", getProductsController);
router.post("/", saveProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
