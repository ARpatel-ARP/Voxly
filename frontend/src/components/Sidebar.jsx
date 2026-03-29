import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Otheruser from "./Otheruser";
import { setOtherUsers } from "../redux/userSlice";

const Sidebar = ({ message }) => {
  const [search, setSearch] = useState("")
  const dispacth = useDispatch()
  const { authUser, otherUsers } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const searchsubmitHandler = (e) => {
    e.preventDefault()
    const convUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase())) 
    if (convUser) {
      dispacth(setOtherUsers([convUser]))
    }else{
      toast.error("No such contacts")
    }   
  }
  
  return (
    <div className="border-r border-slate-500 p-3 w-[25vw] flex flex-col">
       {/* Profile Of logged in user  */}
      <div className="flex justify-between bg-zinc-700/75 rounded-2xl p-2">
        <div className="profile ">
          <div className="avatar flex">
            <div className="w-13 rounded-full ring ring-zinc-500">
              <img
                alt="profile"
                src={authUser?.profilePhoto}
              />
            </div>
              <span className="mt-1 cursor-pointer ml-2 font-bold">{authUser?.fullName}
                <p className="font-thin text-sm ">Your profile</p>
                 </span>
          </div>
        </div>
        <button onClick={logoutHandler} className="">
          <a
            href="#_"
            className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-2xl group"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-3"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
              Log out
            </span>
            <span className="absolute inset-0 border-2 border-white rounded-full"></span>
          </a>
        </button>
        {/* Search bar */}
      </div>
      <form className="mt-5 w-1/2" onSubmit={searchsubmitHandler}>
        <div className="flex">
          <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className=" border-0 input"
          />
          <button
            type="submit"
            className="cursor-pointer hover:bg-zinc-800/20 w-10 mx-auto px-2 hover:rounded-full p-1 ml-px"
          >
            <BiSearchAlt2 size={"20px"} />
          </button>
        </div>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers />
    </div>
  );
};

export default Sidebar;
