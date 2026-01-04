import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./db/connection.js";
import productRouter from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
connectDb();

import http from "http";
import initSocket from "./config/socket.js";
import chatRoutes from "./routes/messageRoutes.js";
const app = express();

const server = http.createServer(app);
initSocket(server);

app.use("/image", express.static("../public/images"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials: true,
  })
);
// /api/product/create
// /api/order/totalOrders
app.use("/api/product", productRouter);
///api/user/create
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/chat", chatRoutes);
// /api/order/${id}
server.listen(9000, () => {
  console.log("App is listing at port number 9000");
});
