import { Server } from "socket.io";
import socketAuth from "../middleware/socketAuthMiddleware.js";
import socketController from "../controllers/chatController.js";

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      ],
      credentials: true
    }
  });

  // apply socket middleware
  io.use(socketAuth);

  io.on("connection", (socket) => {
    socketController(io, socket);
  });

  return io;
};

export default initSocket;
