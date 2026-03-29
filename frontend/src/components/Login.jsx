import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      console.log("Full response:", res.data);
      if (res.data) {
        dispatch(setAuthUser(res.data));
        toast.success("Login successful!");
        console.log("res.data:", res.data);
        setUser({ userName: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full p-4 w-full rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-[0.5px] border-gray-400">
        <h1 className="text-3xl font-bold text-center text-amber-100 bg-clip-text">
          Login
        </h1>
        <form onSubmit={submitHandler} action="">
          <div className="p-3 rounded-3xl">
            <label className="label p-2">
              <span className="  label-text ">User Name</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="bg-gray-800 rounded-xl w-full input-bordered h-7 p-4"
              type="text"
              placeholder="Enter User Name"
            />
          </div>
          <div className="p-3 rounded-3xl">
            <label className="label p-2 ">
              <span className="  label-text ">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="bg-gray-800 rounded-xl w-full input-bordered h-7 p-4"
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <Link to="/Signup" className="text-white my-8 hover:text-black">
            New to Application ? Sign up here
          </Link>
          <div>
            <button
              type="submit"
              className="bg-gradient-to-r from-gray-400 to-gray-900 hover:from-amber-600 hover:via-orange-400 hover:to-amber-600 transition-all duration-500 w-90 ml-4 cursor-pointer mt-4 text-amber-300 hover:text-black px-3 py-2 text-center rounded font-medium border border-amber-600 hover:border-amber-300 shadow-lg shadow-amber-900/50 hover:shadow-amber-500/50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
