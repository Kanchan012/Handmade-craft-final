import jwt from "jsonwebtoken";

const socketAuth = (socket, next) => {
  try {
    const cookie = socket.handshake.headers.cookie;
    if (!cookie) return next(new Error("No cookie"));

    // extract token from cookie string
    const token = cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) return next(new Error("No token"));

    const decoded = jwt.verify(token, "uerhebrueborueygreyhroieuoroeirukeh");

    socket.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    next(new Error("Socket auth failed"));
  }
};

export default socketAuth;
