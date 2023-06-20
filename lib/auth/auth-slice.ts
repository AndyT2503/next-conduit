import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/lib/models";
import { registerUser } from "./auth-action";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
  },
});

export default authSlice.reducer;
