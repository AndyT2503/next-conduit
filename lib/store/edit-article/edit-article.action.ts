import { UpsertArticleBodyRequest, articleAPI } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getArticleToUpdate = createAsyncThunk(
  "editArticle/getArticleToUpdate",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await articleAPI.getArticle(slug);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateArticle = createAsyncThunk(
  "editArticle/updateArticle",
  async (
    request: {
      article: UpsertArticleBodyRequest;
      slug: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await articleAPI.updateArticle(
        request.slug,
        request.article,
      );
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
