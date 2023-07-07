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

export const deleteArticle = createAsyncThunk(
  "articleDetail/deleteArticle",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await articleAPI.deleteArticle(slug);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const favoriteArticle = createAsyncThunk(
  "articleDetail/favoriteArticle",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await articleAPI.favoriteArticle(slug);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)
