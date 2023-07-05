import { articleAPI } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getArticleDetail = createAsyncThunk(
  "articleDetail/getArticleDetail",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await articleAPI.getArticle(slug);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
