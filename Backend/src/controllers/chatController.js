import Message from "../model/Message.js";

const socketController = async (io, socket) => {
  console.log("User connected:", socket.user);
  // Join private room (userId)
  socket.join(socket.user.id);
  // Admin ↔ User message
  socket.on("sendMessage", async ({ toUserId, message }) => {
    console.log(toUserId);
    console.log(message);

    // receiverId,senderId,text
    let res = await Message.create({
      receiverId: toUserId,
      text: message,
      senderId: socket.user.id,
    });
    // console.log(res);
    io.to(toUserId).emit("receiveMessage", {
      from: socket.user.id,
      role: socket.user.role,
      message:res,
    });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.id);
  });
};






export const getAllChat = async (req, res) => {
  try {
    // Aggregate unique users from senderId and receiverId
    const users = await Message.aggregate([
      // 1️⃣ Combine senderId and receiverId into one array
      {
        $project: {
          users: ["$senderId"],
          text: 1,
          createdAt: 1,
        },
      },
      { $unwind: "$users" }, // separate each user into a document
      // 2️⃣ Group by user to get unique users
      {
        $group: {
          _id: "$users",
          lastMessageAt: { $max: "$createdAt" }, // track last message time
        },
      },
      // 3️⃣ Populate user info using $lookup
      {
        $lookup: {
          from: "users", // users collection
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      // 4️⃣ Project only needed fields
      {
        $project: {
          _id: "$user._id",
          name: "$user.name",
          email: "$user.email",
          role: "$user.role",
          image: "$user.image",
          lastMessageAt: 1,
        },
      },
      // 5️⃣ Sort by last message time (latest first)
      { $sort: { lastMessageAt: -1 } },
    ]);

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("getAllChat error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getChat = async (req, res) => {
  try {
    const userId = req.params.id;
    const adminObjectId = req.user.id;

    const chats = await Message.find({
      $or: [
        { senderId: adminObjectId, receiverId: userId },
        { senderId: userId, receiverId: adminObjectId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "name")
      .populate("receiverId", "name");

    if (!chats.length) {
      return res.status(404).json({
        success: false,
        message: "No chats found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      chats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
    });
  }
};

export const myChat = async (req, res) => {
  const { adminId } = req.params;

  try {
    const userId = req.user._id;
    const adminObjectId = adminId;

    const chats = await Message.find({
      $or: [
        { senderId: adminObjectId, receiverId: userId },
        { senderId: userId, receiverId: adminObjectId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "name")
      .populate("receiverId", "name");

    if (!chats.length) {
      return res.status(404).json({
        success: false,
        message: "No chats found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      chats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
    });
  }
};

export default socketController;
