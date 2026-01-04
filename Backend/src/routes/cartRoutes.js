import express from "express";
import {
  addToCart,
  getCartByUser,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/get", protect, getCartByUser);

// increment / decrement
router.patch("/update", protect, updateCartQuantity);

// delete item
router.delete("/remove", protect, removeFromCart);

// clear cart
router.delete("/clear", protect, clearCart);

export default router;
