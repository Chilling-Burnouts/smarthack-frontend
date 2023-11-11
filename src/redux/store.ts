import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./auth";
import { portfolioSlice } from "./portfolio";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [portfolioSlice.name]: portfolioSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
