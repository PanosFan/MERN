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

    updatePostInStore: (state, action) => {
      state.posts = state.posts.map((item) => {
        if (item._id === action.payload.id) {
          return {
            ...item,
            title: action.payload.title,
            content: action.payload.body,
          };
        } else return item;
      });
    },
  },
});

export const {
  setPosts,
  deletePostInStore,
  addPostInStore,
  updatePostInStore,
} = postsSlice.actions;

export default postsSlice.reducer;
