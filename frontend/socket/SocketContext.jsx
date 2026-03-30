import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUser } from "../src/redux/userSlice";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch()

  useEffect(() => {
     console.log("authUser in SocketProvider:", authUser);
    if (authUser?._id) {
      const newSocket = io("http://localhost:8000", {
        query: { userId: authUser._id },
        transports: ["websocket"], // ✅ force websocket, skip polling
      });

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUser(onlineUsers))
        console.log("Socket connected:", newSocket.id); // ✅ debug
      });

      newSocket.on("connect_error", (err) => {
        console.log("Socket error:", err.message); // ✅ debug
      });

      setSocket(newSocket);

      return () => newSocket.close(); // cleanup on logout
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};