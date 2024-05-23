import { createReducer } from "@reduxjs/toolkit";
import {
  fetchNewsDetailsFail,
  fetchNewsDetailsStart,
  fetchNewsDetailsSuccess,
  fetchNewsIdsFail,
  fetchNewsIdsStart,
  fetchNewsIdsSuccess,
  addReply,
} from "./action";
import { NewsState } from "../types/types";

const initialState: NewsState = {
  ids: [],
  newsItems: [],
  isLoading: false,
  error: null,
};

export const newsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchNewsIdsStart, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchNewsIdsSuccess, (state, action) => {
      state.ids = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchNewsIdsFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(fetchNewsDetailsStart, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchNewsDetailsSuccess, (state, action) => {
      state.newsItems = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchNewsDetailsFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(addReply, (state, action) => {
      const { articleId, reply } = action.payload;
      const article = state.newsItems.find((item) => item.id === articleId);
      if (article) {
        if (!article.replies) {
          article.replies = [];
        }
        article.replies.push(reply);
      }
    });
});
