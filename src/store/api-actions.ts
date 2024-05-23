import { ThunkAction } from "redux-thunk";
import { RootState } from "./index";
import { Action } from "redux";
import {
    fetchNewsDetailsFail,
    fetchNewsDetailsStart,
    fetchNewsDetailsSuccess,
    fetchNewsIdsFail,
    fetchNewsIdsStart,
    fetchNewsIdsSuccess,
} from "./action";
import {NewsItem, ThunkExtraArgument} from "../types/types";

type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    ThunkExtraArgument,
    Action<string>
    >;

export const fetchNewsIds = (): AppThunk => async (dispatch,
                                                   _getState, { api }) => {
    dispatch(fetchNewsIdsStart());
    try {
        const response = await api.get<number[]>(`/newstories.json`);
        const first100Ids = response.data.slice(0, 25);
        dispatch(fetchNewsIdsSuccess(first100Ids));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(fetchNewsIdsFail(error.toString()));
        } else {
            dispatch(fetchNewsIdsFail("An unknown error occurred"));
        }
    }
};

export const fetchNewsDetails = (): AppThunk => async (dispatch,
                                                       _getState, { api }) => {
    await dispatch(fetchNewsIds());
    const idsToFetch = (await _getState()).articles.ids;

    dispatch(fetchNewsDetailsStart());

    try {
        const requests = idsToFetch.map(id =>
            api.get<NewsItem>(`/item/${id}.json`)
        );
        const responses = await Promise.all(requests);
        const newsItems = responses.map(res => ({
            ...res.data,
            comments: []
        }));

        dispatch(fetchNewsDetailsSuccess(newsItems));
    } catch (error: unknown) {
        if (error instanceof Error) {
            dispatch(fetchNewsDetailsFail(error.toString()));
        } else {
            dispatch(fetchNewsDetailsFail("An unknown error occurred"));
        }
    }
};
