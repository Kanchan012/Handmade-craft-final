import { getIO } from "../config/socket.js";
import Message from "../model/Message.js";

export const sendMessageService = async ({
  chatId,
  senderId,
  text,
  roomId
}) => {
  const message = await Message.create({
    chatId,
    senderId,
    text
  });
  const io = getIO();
  io.to(roomId).emit("newMessage", message);

  return message;
};
