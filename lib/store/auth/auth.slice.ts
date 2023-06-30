import { FormStatus, StorageKey } from "@/lib/constants";
import { ErrorResponse, User } from "@/lib/models";
import { storageService } from "@/lib/utils";
import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, updateCurrentUser } from "./auth.action";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: FormStatus;
  errorResponse: ErrorResponse | null;
}

const initialState = (): AuthState => {
  const user = storageService("localStorage").getItem<User>(StorageKey.User);
  return {
    isAuthenticated: !!user,
    user,
    status: FormStatus.Idle,
    errorResponse: null,
  };
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    logout: (state) => {
      storageService("localStorage").removeItem(StorageKey.User);
      state.user = null;
      state.isAuthenticated = false;
    },
    resetErrorResponse: (state) => {
      state.errorResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
      storageService("localStorage").setItem(
        StorageKey.User,
        action.payload.user,
      );
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      storageService("localStorage").setItem(
        StorageKey.User,
        action.payload.user,
      );
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      storageService("localStorage").setItem(
        StorageKey.User,
        action.payload.user,
      );
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addMatcher(
      (action: Action<string>) =>
        action.type.startsWith("auth") && action.type.endsWith("/pending"),
      (state) => {
        state.status = FormStatus.Pending;
        state.errorResponse = null;
      },
    );
    builder.addMatcher(
      (action: Action<string>) =>
        (action.type.startsWith("auth") &&
          action.type.endsWith("/fulfilled")) ||
        (action.type.startsWith("auth") && action.type.endsWith("/rejected")),
      (state) => {
        state.status = FormStatus.Idle;
      },
    );
    builder.addMatcher(
      (action: Action<string>): action is PayloadAction<ErrorResponse> =>
        action.type.startsWith("auth") && action.type.endsWith("/rejected"),
      (state, action) => {
        state.errorResponse = action.payload;
      },
    );
  },
});
