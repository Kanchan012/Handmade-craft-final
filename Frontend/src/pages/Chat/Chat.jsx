import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

const SOCKET_URL = "http://localhost:9000";
const API_URL = "http://localhost:9000";

function Chat() {
  const { user } =
    useContext(AuthContext);
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  console.log(user);

  const ADMIN_ID = user?._id; // admin id

  /* ================= FETCH USERS ================= */
  const getAllChatsUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/chat/getAllChat`, {
        credentials: "include",
      });
      const data = await res.json();
      setChatUsers(data.users || []);
    } catch (err) {
      console.error("Failed to fetch chat users");
    }
  };

  /* ================= FETCH CHAT ================= */
  const getChat = async (user) => {
    // console.log(user)
    setSelectedUser(user);
    try {
      const res = await fetch(`${API_URL}/api/chat/getChat/${user._id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setChatList(data.chats || []);
    } catch (err) {
      console.error("Failed to fetch chat");
    }
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = () => {
    if (!inputMessage.trim() || !selectedUser) return;
    const tempMessage = {
      _id: Date.now(), // temporary id
      senderId: { _id: ADMIN_ID },
      receiverId: selectedUser._id,
      text: inputMessage,
    };
    // show instantly (optimistic UI)
    setChatList((prev) => [...prev, tempMessage]);
    socketRef.current.emit("sendMessage", {
      toUserId: selectedUser._id,
      message: inputMessage,
    });

    setInputMessage("");
  };

  /* ================= INIT ================= */
  useEffect(() => {
    getAllChatsUsers();
  }, []);

  /* ================= SOCKET ================= */
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
    });

    socketRef.current.on("receiveMessage", (data) => {
      const msg = data.message;
      console.log(msg);
      console.log(selectedUser);
      setChatList((prev) => [...prev, msg]);

      // if (
      //   selectedUser &&
      //   (msg.senderId === selectedUser._id ||
      //     msg.receiverId === selectedUser._id)
      // ) {
      // }
    });

    return () => socketRef.current.disconnect();
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatList]);

  return (
    <div>
      {/* HEADER */}
      <div className="bg-gray-300 p-4">
        <h1 className="text-xl font-bold">Admin Chat</h1>
      </div>

      <div className="flex gap-x-3">
        {/* USERS LIST */}
        <div className="w-60 bg-white shadow-2xl p-3 space-y-2">
          {chatUsers.length ? (
            chatUsers.map((user) => (
              user?._id!==ADMIN_ID &&
              <div
                key={user._id}
                onClick={() => getChat(user)}
                className={`flex cursor-pointer items-center gap-2 p-2 rounded
                ${
                  selectedUser?._id === user._id
                    ? "bg-blue-100"
                    : "hover:bg-gray-200"
                }`}
              >
                <img
                  src={`${API_URL}/image/${user.image}`}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <span className="font-medium">{user.name}</span>
              </div>
              
            ))
          ) : (
            <p>No chats found</p>
          )}
        </div>

        {/* CHAT WINDOW */}
        <div className="flex-1">
          {selectedUser ? (
            <>
              <div className="p-6 h-80 overflow-auto bg-white shadow-2xl space-y-3">
                {chatList.map((msg) => {
                  const isAdmin = msg.senderId._id === ADMIN_ID;

                  return (
                    <div
                      key={msg._id}
                      className={`flex ${
                        isAdmin ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded max-w-xs ${
                          isAdmin ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* INPUT */}
              <div className="p-3 flex gap-3">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 p-3 border rounded outline-none"
                  placeholder="Type message..."
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-amber-500 hover:bg-amber-600 px-4 text-white rounded disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="p-6 font-bold">Select a user to view messages</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
