import { StorageKey } from "@/lib/constants";
import { ErrorResponse, User } from "@/lib/models";
import { storageService } from "@/lib/utils";
import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./auth-action";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: "pending" | "done";
  errorResponse: ErrorResponse | null;
}

const initialState = (): AuthState => {
  const user = storageService("localStorage").getItem<User>(StorageKey.user);
  return {
    isAuthenticated: !!user,
    user,
    status: "done",
    errorResponse: null,
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
    resetErrorResponse: (state) => {
      state.errorResponse = null;
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
        state.errorResponse = null;
      }
    );
    builder.addMatcher(
      (action: Action<string>) =>
        action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
      (state) => {
        state.status = "done";
      }
    );
    builder.addMatcher(
      (action: Action<string>): action is PayloadAction<ErrorResponse> =>
        action.type.endsWith("/rejected"),
      (state, action) => {
        state.errorResponse = action.payload;
      }
    );
  },
});
