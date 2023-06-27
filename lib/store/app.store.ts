import { authSlice } from "@/lib/store/auth/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import { addArticleSlice } from "./add-article/add-article.slice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    addArticle: addArticleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
