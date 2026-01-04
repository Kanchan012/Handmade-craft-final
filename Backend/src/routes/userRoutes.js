import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
  login,
  logout,
  getAdminById
} from "../controllers/userController.js";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

// /api/user/create
userRoutes.post("/register",upload.single('image'), createUser);
userRoutes.get("/getMe",protect, getUsers);
userRoutes.get("/get", getAllUsers);
userRoutes.get("/get/:id", getUserById);
userRoutes.get("/get/admin/:id", getAdminById);
userRoutes.put("/update/:id", updateUser);
userRoutes.delete("/delete/:id", deleteUser);
userRoutes.post("/login", login);
userRoutes.get("/logout", logout);


export default userRoutes;
