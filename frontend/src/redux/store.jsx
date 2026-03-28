import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice.jsx"
import messageReducer from "./messageSlice.jsx"
const store = configureStore({
    reducer:{
        user:userReducer,
        message:messageReducer
    }
})
export default store