import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterBodyRequest } from "@/lib/api"

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: RegisterBodyRequest) => {}
);
