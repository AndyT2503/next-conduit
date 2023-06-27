import {
  LoginBodyRequest,
  RegisterBodyRequest,
  UpdateCurrentUserBodyRequest,
  userAPI,
} from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: RegisterBodyRequest, { rejectWithValue }) => {
    try {
      const response = await userAPI.register(user);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  "auth/updateCurrentUser",
  async (user: UpdateCurrentUserBodyRequest, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateCurrentUser(user);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginBodyRequest, { rejectWithValue }) => {
    try {
      const response = await userAPI.login(user);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getCurrentUser();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
