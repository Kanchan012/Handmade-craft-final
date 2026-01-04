import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Chat", chatSchema);
