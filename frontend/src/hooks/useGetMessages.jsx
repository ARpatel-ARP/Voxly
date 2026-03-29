import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.jsx";

const useGetMessages = () => {
  const { selectedUser } = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) return;

    // Cancel previous fetch if user switches before it completes
    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8000/api/v1/message/${selectedUser._id}`,
          { signal: controller.signal }
        );
        dispatch(setMessages(res.data));
      } catch (error) {
        if (axios.isCancel(error)) return; // ignore cancelled requests
        console.log(error);
      }
    };

    fetchMessages();

    // Cleanup — cancels the in-flight request when user switches
    return () => controller.abort();

  }, [selectedUser?._id]); // ✅ use _id not the whole object
};

export default useGetMessages;