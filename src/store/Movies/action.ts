import { IFetchMoviesSuccessPayload } from "../../types/movie";
import { MoviesActionsTypes, MOVIES_ACTION } from "./actionTypes";

export const FetchMoviesAction = (page: number = 1): MoviesActionsTypes => ({
  type: MOVIES_ACTION.FETCH_MOVIES,
  page,
});

export const FetchMoviesSuccessAction = (
  payload: IFetchMoviesSuccessPayload
): MoviesActionsTypes => ({
  type: MOVIES_ACTION.FETCH_MOVIES_SUCCESS,
  payload,
});

export const FetchMoviesErrorAction = (error: string): MoviesActionsTypes => ({
  type: MOVIES_ACTION.FETCH_MOVIES_ERROR,
  error,
});

export const FetchSearchMoviesAction = (
  query: string,
  page: number
): MoviesActionsTypes => ({
  type: MOVIES_ACTION.FETCH_SEARCH_MOVIES,
  query,
  page,
});

export const FetchSearchMoviesSuccessAction = (
  payload: IFetchMoviesSuccessPayload
): MoviesActionsTypes => ({
  type: MOVIES_ACTION.FETCH_SEARCH_MOVIES_SUCCESS,
  payload,
});

export const FetchSearchMoviesErrorAction = (
  error: string
): MoviesActionsTypes => ({
  type: MOVIES_ACTION.FETCH_SEARCH_MOVIES_ERROR,
  error,
});
