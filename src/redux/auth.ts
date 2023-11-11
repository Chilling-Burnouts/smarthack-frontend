import { createSlice } from "@reduxjs/toolkit";

import { useAppSelector } from "./store";

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const useAuthState = () => useAppSelector((state) => state.auth);

export default authSlice.reducer;
