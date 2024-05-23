import {
  fetchNewsDetailsFail,
  fetchNewsDetailsStart,
  fetchNewsDetailsSuccess,
  fetchNewsIdsFail,
  fetchNewsIdsStart,
  fetchNewsIdsSuccess,
} from "./action";
import { NewsItem } from "../types/types";

export const fetchNewsIds =
  () =>
  async (dispatch, getState, { api }) => {
    dispatch(fetchNewsIdsStart());
    try {
      const response = await api.get<number[]>(`/newstories.json`);
      const first100Ids = response.data.slice(0, 25);
      dispatch(fetchNewsIdsSuccess(first100Ids));
    } catch (error) {
      dispatch(fetchNewsIdsFail(error.toString()));
    }
  };

export const fetchNewsDetails =
  () =>
  async (dispatch, getState, { api }) => {
    await dispatch(fetchNewsIds());
    const idsToFetch = getState().articles.ids;

    dispatch(fetchNewsDetailsStart());

    try {
      const requests = idsToFetch.map((id) =>
        api.get<NewsItem>(`/item/${id}.json`),
      );
      const responses = await Promise.all(requests);
      const newsItems = responses.map((res) => ({
        ...res.data,
        comments: [],
      }));

      dispatch(fetchNewsDetailsSuccess(newsItems));
    } catch (error) {
      dispatch(fetchNewsDetailsFail(error.toString()));
    }
  };
