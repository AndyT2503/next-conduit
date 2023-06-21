import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/lib/models";
import { loginUser, registerUser } from "./auth-action";
import { StorageKey } from "@/lib/constants";
import { storageService } from "@/lib/utils";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: "pending" | "done";
}

const initialState = (): AuthState => {
  const user = storageService("localStorage").getItem<User>(StorageKey.user);
  return {
    isAuthenticated: !!user,
    user,
    status: "done",
  };
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logout: (state) => {
      storageService("localStorage").removeItem(StorageKey.user);
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      storageService("localStorage").setItem(
        StorageKey.user,
        action.payload.user
      );
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      storageService("localStorage").setItem(
        StorageKey.user,
        action.payload.user
      );
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.status = "pending";
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
      (state) => {
        state.status = "done";
      }
    );
  },
});

export default authSlice.reducer;
