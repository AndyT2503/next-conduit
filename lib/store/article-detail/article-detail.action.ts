import appStore from "@/lib/store/app.store";
import { articleAPI } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../app.store";

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
  },
);

export const toggleFavoriteArticle = createAsyncThunk(
  "articleDetail/favoriteArticle",
  async (slug: string, { rejectWithValue }) => {
    const article = appStore.getState().articleDetail.article;
    if (!article) {
      return rejectWithValue('Article does not exist');
    }
    try {      
      if (article.favorited) {
        return await articleAPI.unFavoriteArticle(slug);
      } else {
        return await articleAPI.favoriteArticle(slug);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);