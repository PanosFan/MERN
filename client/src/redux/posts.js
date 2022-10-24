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

    pushCommentInStore: (state, action) => {
      state.posts = state.posts.map((item) => {
        if (item._id === action.payload.id) {
          let commentsCopy = [...item.comments];
          commentsCopy.push({
            user: {
              name: action.payload.user,
              id: action.payload.userID,
            },
            content: action.payload.comment,
            _id: action.payload.commentID,
          });
          return {
            ...item,
            comments: commentsCopy,
          };
        } else return item;
      });
    },

    deleteCommentFromStore: (state, action) => {
      state.posts = state.posts.map((item) => {
        if (item._id === action.payload.id) {
          let commentsCopy = [...item.comments];
          commentsCopy = commentsCopy.filter(
            (comment) => comment._id != action.payload.commentID
          );
          return {
            ...item,
            comments: commentsCopy,
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
  pushCommentInStore,
  deleteCommentFromStore,
} = postsSlice.actions;

export default postsSlice.reducer;
