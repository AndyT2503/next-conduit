import { articleAPI, UpsertArticleBodyRequest } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createNewArticle = createAsyncThunk(
  "article/create",
  async (article: UpsertArticleBodyRequest, { rejectWithValue }) => {
    try {
      const response = await articleAPI.createArticle(article);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
