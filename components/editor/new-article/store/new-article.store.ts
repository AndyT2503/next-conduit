import { configureStore } from "@reduxjs/toolkit";
import { newArticleSlice } from "./new-article.slice";

const store = configureStore({
    reducer: {
      auth: newArticleSlice.reducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type NewArticleDispatch = typeof store.dispatch