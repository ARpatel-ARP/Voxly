import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageModule from "redux-persist/lib/storage";
const storage = storageModule.default;
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSlice.jsx"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // ✅ only persist user slice
};

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  socket:socketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
