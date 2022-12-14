import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    unsetAuth: (state) => {
      state.auth = false;
    },
  },
});

export const { setAuth, unsetAuth } = authSlice.actions;

export default authSlice.reducer;
