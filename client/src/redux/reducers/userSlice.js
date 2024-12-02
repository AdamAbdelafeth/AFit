import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  currentUser: null,
};

// Creating the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      localStorage.setItem("afit-app-token", action.payload.token); // Store token in local storage
    },
    logout: (state) => {  // Action to handle logout
      state.currentUser = null;
      localStorage.removeItem("affit-app-token"); // Remove token from local storage
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
