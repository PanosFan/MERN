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
      let copy = [...state.posts];
      copy = copy.filter((arrow) => arrow._id !== action.payload);
      state.posts = copy;
    },
    addPostInStore: (state, action) => {
      let copy = [...state.posts, action.payload];
      state.posts = copy;
    },
  },
});

export const { setPosts, deletePostInStore, addPostInStore } =
  postsSlice.actions;

export default postsSlice.reducer;
