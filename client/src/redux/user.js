import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  userID: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.userID = action.payload.userID;
    },
    unsetUser: (state) => {
      state.user = "";
      state.userID = "";
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
