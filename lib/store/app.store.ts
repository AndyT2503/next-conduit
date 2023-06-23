import { authSlice } from "@/lib/auth/auth-slice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch


export default store;
