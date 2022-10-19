import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/userSlice";
import { postReducer } from "redux/slice/postSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    posts: postReducer,
  },
});

export default store;
