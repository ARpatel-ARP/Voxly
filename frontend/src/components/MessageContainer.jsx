import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = ({user}) => {
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  
  if (!selectedUser) {
    return (
      <div className="md:min-w-112.5 flex flex-col p-2 relative">
        <div className="flex-1 flex items-center justify-center h-full text-zinc-300 text-sm">
          Select a Contact to start chatting
        </div>
      </div>
    );
  }
  
  const isOnline = onlineUsers.includes(selectedUser?._id)
  return (
    <div className="md:min-w-112.5 flex flex-col h-full ">
      {/* Header */}
      <div className="flex bg-zinc-900 gap-2 p-0.5 items-center rounded-2xl shrink-0">
        <div className={`avatar online`}>
          <div className="w-13 p-1 relative">
            <img
              className="rounded-full -ml-1 "
              src={selectedUser?.profilePhoto}
              alt="profile"
              width={60}
            />
            {
                  isOnline &&  <div className="activebtn bg-green-600 rounded-full absolute bottom-2 left-8 w-2 h-2"></div>
            }
          </div>
        </div>
        <div className="flex flex-col p-2 flex-1">
          <div className=" gap-2 flex-1">
            <p>{selectedUser?.fullName}</p>
            {
                  isOnline &&  <p className='font-thin text-sm text-zinc-300'>Active now</p>
            }
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3">
        <Messages />
      </div>
      <div className="shrink-0 p-2">
        <SendInput />
      </div>
    </div>
  );
};

export default MessageContainer;