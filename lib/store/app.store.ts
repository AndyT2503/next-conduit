import { addArticleSlice } from "@/lib/store/add-article";
import { authSlice } from "@/lib/store/auth";
import { configureStore } from "@reduxjs/toolkit";
import { articleDetailSlice } from "./article-detail";
import { editArticleSlice } from "./edit-article";
import { homeSlice } from "./home";
import { profileSlice } from "./profile";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    addArticle: addArticleSlice.reducer,
    editArticle: editArticleSlice.reducer,
    articleDetail: articleDetailSlice.reducer,
    home: homeSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
