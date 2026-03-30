import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../socket/SocketContext.jsx";
import { appendMessage } from "../redux/messageSlice.jsx";

const useGetRTmessage = () => {
   const socket = useSocket()
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  // ✅ Use functional update pattern to avoid stale closure
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      dispatch(appendMessage(newMessage)); // ✅ see Bug 3 below
    });

    return () => socket.off("newMessage");
  }, [socket]); // ✅ only socket as dependency
};

export default useGetRTmessage;
