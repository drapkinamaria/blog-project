import { createAction } from "@reduxjs/toolkit";
import { NewsItem, Reply } from "../types/types";

export const fetchNewsIdsStart = createAction("news/fetchIdsStart");
export const fetchNewsIdsSuccess = createAction<number[]>(
  "news/fetchIdsSuccess",
);
export const fetchNewsIdsFail = createAction<string>("news/fetchIdsFail");

export const fetchNewsDetailsStart = createAction("news/fetchDetailsStart");
export const fetchNewsDetailsSuccess = createAction<NewsItem[]>(
  "news/fetchDetailsSuccess",
);
export const fetchNewsDetailsFail = createAction<string>(
  "news/fetchDetailsFail",
);

export const addReply = createAction<{ articleId: number; reply: Reply }>(
  "articles/addReply",
);
