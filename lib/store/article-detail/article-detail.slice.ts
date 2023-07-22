import { Article, Comment } from "@/lib/models";
import { createSlice } from "@reduxjs/toolkit";
import {
  getArticleComments,
  getArticleDetail,
  toggleFavoriteArticleInArticleDetailPage,
  toggleFollowProfileInArticleDetailPage,
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
    builder.addCase(
      toggleFavoriteArticleInArticleDetailPage.fulfilled,
      (state, action) => {
        state.article = action.payload.article;
      },
    );
    builder.addCase(getArticleComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments;
    });
    builder.addCase(
      toggleFollowProfileInArticleDetailPage.fulfilled,
      (state, action) => {
        state.article = {
          ...state.article!,
          author: action.payload.profile,
        };
      },
    );
  },
});
