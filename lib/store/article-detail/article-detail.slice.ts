import { Article, Comment } from "@/lib/models";
import { createSlice } from "@reduxjs/toolkit";
import {
  getArticleDetail,
  toggleFavoriteArticle,
} from "./article-detail.action";

interface ArticleDetailState {
  article: Article | null;
  comments: Comment[];
  isArticleExist: boolean;
}

const initialState: ArticleDetailState = {
  article: null,
  comments: [],
  isArticleExist: true,
};

export const articleDetailSlice = createSlice({
  name: "articleDetail",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getArticleDetail.fulfilled, (state, action) => {
      state.article = action.payload.article;
    });
    builder.addCase(getArticleDetail.rejected, (state) => {
      state.isArticleExist = false;
    });
    builder.addCase(toggleFavoriteArticle.fulfilled, (state, action) => {
      state.article = action.payload.article;
    });
  },
});
