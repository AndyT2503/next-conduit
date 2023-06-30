import { authSlice } from "@/lib/store/auth";
import { configureStore } from "@reduxjs/toolkit";
import { addArticleSlice } from "@/lib/store/add-article";
import { editArticleSlice } from "./edit-article";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    addArticle: addArticleSlice.reducer,
    editArticle: editArticleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
