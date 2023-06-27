import { ErrorResponse } from "@/lib/models";
import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNewArticle } from "./new-article.action";

interface NewArticleState {
  formStatus: "idle" | "pending" | "success";
  errorResponse: ErrorResponse | null;
}

const initialState: NewArticleState = {
  errorResponse: null,
  formStatus: "idle",
};

export const newArticleSlice = createSlice({
  name: "newArticle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewArticle.fulfilled, (state) => {
      state.formStatus = "success";
    });
    builder.addMatcher(
      (action: Action<string>): action is PayloadAction<ErrorResponse> =>
        action.type.endsWith("/rejected"),
      (state, action) => {
        state.errorResponse = action.payload;
        state.formStatus = "idle";
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.formStatus = "pending";
        state.errorResponse = null;
      }
    );
  },
});
