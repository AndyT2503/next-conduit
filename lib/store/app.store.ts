import authReducer from "@/lib/auth/auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import {  } from "@/lib/api"
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch


export default store;
