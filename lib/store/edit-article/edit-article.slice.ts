import { FormStatus } from "@/lib/constants";
import { Article, ErrorResponse } from "@/lib/models";
import { Action, createSlice } from "@reduxjs/toolkit";
import { getArticleToUpdate, updateArticle } from "./edit-article.action";

interface EditArticleState {
  formStatus: FormStatus;
  errorResponse: ErrorResponse | null;
  article: Article | null;
  updatedArticle: Article | null;
  isArticleExist: boolean;
}

const initialState: EditArticleState = {
  errorResponse: null,
  formStatus: FormStatus.Idle,
  article: null,
  updatedArticle: null,
  isArticleExist: true,
};

export const editArticleSlice = createSlice({
  name: "editArticle",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.updatedArticle = action.payload.article;
    });
    builder.addCase(getArticleToUpdate.rejected, (state) => {
      state.isArticleExist = false;
    });
    builder.addCase(getArticleToUpdate.fulfilled, (state, action) => {
      state.article = action.payload.article;
    });
    builder.addMatcher(
      (action: Action<string>) =>
        (action.type.startsWith("editArticle") &&
          action.type.endsWith("/fulfilled")) ||
        (action.type.startsWith("editArticle") &&
          action.type.endsWith("/rejected")),
      (state) => {
        state.formStatus = FormStatus.Idle;
      },
    );
    builder.addMatcher(
      (action: Action<string>) => action.type.startsWith("editArticle") && action.type.endsWith("/pending"),
      (state) => {
        state.formStatus = FormStatus.Pending;
        state.errorResponse = null;
      },
    );
  },
});
