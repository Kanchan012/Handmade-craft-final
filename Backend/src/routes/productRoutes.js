import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { upload } from "../middleware/upload.js";

const productRouter = express.Router();
// /api/product/create
productRouter.post("/create",upload.single('image'),createProduct)
productRouter.get("/get", getAllProducts)
productRouter.get("/:id", getProductById)
productRouter.put("/update/:id", updateProduct)
productRouter.delete("/delete/:id", deleteProduct)
export default productRouter;
