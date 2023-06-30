import { Article, ErrorResponse } from "@/lib/models";
import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNewArticle } from "./add-article.action";
import { FormStatus } from "@/lib/constants";

interface AddArticleState {
  formStatus: FormStatus;
  errorResponse: ErrorResponse | null;
  article: Article | null;
}

const initialState: AddArticleState = {
  errorResponse: null,
  formStatus: FormStatus.Idle,
  article: null,
};

export const addArticleSlice = createSlice({
  name: "addArticle",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createNewArticle.fulfilled, (state, action) => {
      state.formStatus = FormStatus.Idle;
      state.article = action.payload.article;
    });
    builder.addMatcher(
      (action: Action<string>): action is PayloadAction<ErrorResponse> =>
        action.type.startsWith("addArticle") &&
        action.type.endsWith("/rejected"),
      (state, action) => {
        state.errorResponse = action.payload;
        state.formStatus = FormStatus.Idle;
      },
    );
    builder.addMatcher(
      (action: Action<string>) =>
        action.type.startsWith("addArticle") &&
        action.type.endsWith("/pending"),
      (state) => {
        state.formStatus = FormStatus.Pending;
        state.errorResponse = null;
      },
    );
  },
});
