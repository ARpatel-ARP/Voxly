import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Simessage = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSender = 
  (message?.senderId?._id || message?.senderId)?.toString() === 
  authUser?._id?.toString()
  
  if (!authUser) return null 
  return (
    <div
      ref={scroll}
      className={`chat ${isSender ? "chat-end " : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="profile"
            src={isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto} // ✅ correct photo
          />
        </div>
      </div>
      <div className="chat-header">
        {!isSender && <span>{selectedUser?.fullName}</span>}
        <time className="text-xs opacity-50">12:46</time>
      </div>
      <div className={`chat-bubble ${isSender ? "bg-[#8B4513] " : "bg-zinc-800"}`}>{message?.message}</div>
    </div>
  );
};

export default Simessage;
