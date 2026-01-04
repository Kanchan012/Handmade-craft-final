import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { apiClient } from "../../../../Frontend/src/api/apiClient";
import { io } from "socket.io-client";
const SOCKET_URL = "http://localhost:9000";
function Chat() {
  const { user } = useContext(AuthContext);
  const ADMIN_ID = user?.adminID;
  const [admin, setAdmin] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const userId = user?.user?._id;

  let getMyMessage = async () => {
    try {
      const res = await apiClient(`/api/chat/myChat/${ADMIN_ID}`, {
        credentials: "include",
      });
      setMessages(res.chats || []);
      // console.log(res.chats);
    } catch (err) {
      console.error("Failed to fetch messages");
    }
  };

  const getAdmin = async () => {
    try {
      const res = await apiClient(`/api/user/get/admin/${ADMIN_ID}`);
      setAdmin(res.user);
    } catch (err) {
      console.error("Failed to fetch admin");
    }
  };
  const sendMessage = () => {
    if (!message.trim() || !admin?._id) return;
    socketRef.current.emit("sendMessage", {
      toUserId: admin._id,
      message,
    });
    getMyMessage();

    setMessage("");
  };

  // 🔹 Fetch admin
  useEffect(() => {
    getAdmin();
  }, []);
  // 🔹 Fetch previous chats
  useEffect(() => {
    if (!userId) return;
    getMyMessage();
  }, [userId]);

  // 🔹 Init socket
  useEffect(() => {
    if (!userId) return;
    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current.on("receiveMessage", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data.message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId]);

  // 🔹 Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send message

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-3">
        Chat with {admin?.name || "Admin"}
      </h2>

      <div className="  overflow-y-auto bg-white border-red-600 p-3 rounded">
        {messages?.map((m, i) => {
          const isMe = m?.senderId?._id == userId;
          return (
            <div
              key={i}
              className={`my-2  flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded max-w-xs ${
                  isMe ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="border p-2 w-full rounded"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;