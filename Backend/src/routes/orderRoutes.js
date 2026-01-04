import express from "express";
import { checkout,getOrderByOrderId, deleteOrder, getAllOrders, getOrderById, getOrderStatusById, totalOrders, updatePaymentStatus } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
const orderRoutes = express.Router();
// /api/order/totalOrders
// /api/order/${id}
// 🔒 Checkout: create order from cart
orderRoutes.post("/checkout",protect, checkout);
// 📦 Get all orders
orderRoutes.get("/", getAllOrders);

// 📄 Get single order
// getOrderById
orderRoutes.get("/getOrderById",protect, getOrderById);
orderRoutes.get("/get/:id",protect, getOrderStatusById);
orderRoutes.get("/getOrderByOrderId/:id", getOrderByOrderId);

//getOrderById
// ✏️ Update payment status
orderRoutes.get("/payment", updatePaymentStatus);

// 🗑️ Delete order
orderRoutes.delete("/:id", deleteOrder);

// 📊 Dashboard / stats
orderRoutes.get("/totalOrders", totalOrders);

export default orderRoutes;
