import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { newsReducer } from "./news-reducer";

export const store = configureStore({
  reducer: {
    articles: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
