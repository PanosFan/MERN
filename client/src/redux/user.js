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
      state.user = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    unsetUser: (state) => {
      state.user = "";
      state.userID = "";
    },
  },
});

export const { setUser, setUserID, unsetUser } = userSlice.actions;

export default userSlice.reducer;
