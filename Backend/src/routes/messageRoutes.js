
import express from 'express'
import { getAllChat,getChat,myChat } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';
const chatRoutes = express.Router();
chatRoutes.get("/getAllChat", getAllChat);
chatRoutes.get("/getChat/:id",protect, getChat);
chatRoutes.get("/myChat/:adminId",protect, myChat);
// getAllChat
export default chatRoutes;