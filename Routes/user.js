import express from "express";

import { 
  createUser,
   loginUser,
   verifyUser,

 } from "../Controller/user.js";

import {
  saveProductController,
  getProductsController,
} from "../Controller/product.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/createuser", createUser);
router.get("/verify", verifyUser);

router.post("/addproduct", saveProductController);

router.get("/products", getProductsController);

export default router;