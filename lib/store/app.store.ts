import { authSlice } from "@/lib/store/auth";
import { configureStore } from "@reduxjs/toolkit";
import { addArticleSlice } from "@/lib/store/add-article";
import { editArticleSlice } from "./edit-article";
import { articleDetailSlice } from "./article-detail";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    addArticle: addArticleSlice.reducer,
    editArticle: editArticleSlice.reducer,
    articleDetail: articleDetailSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
