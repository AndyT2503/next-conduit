import authReducer from "@/lib/auth/auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import {  } from "@/lib/api"
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
