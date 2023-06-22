import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginBodyRequest, RegisterBodyRequest, userAPI } from "@/lib/api";
import { ErrorResponse } from "../models";

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
