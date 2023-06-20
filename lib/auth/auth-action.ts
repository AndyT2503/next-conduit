import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterBodyRequest, userAPI } from "@/lib/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: RegisterBodyRequest, { rejectWithValue }) => {
    try {
      const response = await userAPI.register(user);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
