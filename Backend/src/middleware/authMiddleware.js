import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const protect = async (req, res, next) => {
  try {
    // 🍪 Get token from cookie
    const token = req.cookies.token;

    // console.log(token)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token,"uerhebrueborueygreyhroieuoroeirukeh");
    // 🔍 Get user (exclude password)
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });
    }
    // ✅ Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
