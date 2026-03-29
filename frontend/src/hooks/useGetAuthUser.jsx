import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const useGetAuthUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get("http://localhost:8000/api/v1/user/me");
                dispatch(setAuthUser(res.data));
            } catch (error) {
                dispatch(setAuthUser(null));
                console.log(error);
            }
        };
        fetchAuthUser();
    }, []);
};

export default useGetAuthUser;