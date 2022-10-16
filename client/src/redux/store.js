import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import authReducer from "./auth";
import postsReducer from "./posts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    userID: userReducer,
    posts: postsReducer,
  },
});
