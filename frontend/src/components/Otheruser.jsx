import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const Otheruser = ({user}) => {
    const dispatch = useDispatch()
    const {selectedUser, onlineUsers} = useSelector(store=>store.user)
    const isOnline = onlineUsers.includes(user._id)
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user))

      
    }
    
  return (
    <>
      <div onClick={() => selectedUserHandler(user)} className={`${selectedUser?._id === user?._id? 'bg-gray-600/35 ' : " "}  cursor-pointer flex gap-2 rounded-2xl h-12 items-center transition-all duration-150 ease-in-out `}>
        <div className={`avatar ${isOnline?'online' : ''}`}>
          <div className="w-13 p-1">
            <img
              className="rounded-full -ml-1 "
              src={user?.profilePhoto}
              alt="profile"
              width={60}
            />
            {
                  isOnline &&  <div className="activebtn bg-green-600 rounded-full absolute bottom-2 left-8 w-2 h-2"></div>
            }
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 flex-1 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider h-0.5 bg-gray-300 opacity-10"></div>
    </>
  );
};

export default Otheruser;
