import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    deletePostInStore: (state, action) => {
      state.posts = state.posts.filter((item) => item._id !== action.payload);
    },

    addPostInStore: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});

export const { setPosts, deletePostInStore, addPostInStore } =
  postsSlice.actions;

export default postsSlice.reducer;
