import { IFetchMoviesSuccessPayload } from "../../types/movie";

export enum MOVIES_ACTION {
  FETCH_MOVIES = "@@FETCH_MOVIES",
  FETCH_MOVIES_SUCCESS = "@@FETCH_MOVIES_SUCCESS",
  FETCH_MOVIES_ERROR = "@@FETCH_MOVIES_ERROR",

  FETCH_SEARCH_MOVIES = "@@FETCH_SEARCH_MOVIES",
  FETCH_SEARCH_MOVIES_SUCCESS = "@@FETCH_SEARCH_MOVIES_SUCCESS",
  FETCH_SEARCH_MOVIES_ERROR = "@@FETCH_SEARCH_MOVIES_ERROR",
}

interface FetchMoviesRequest {
  type: MOVIES_ACTION.FETCH_MOVIES;
  page: number;
}

interface FetchMoviesSuccess {
  type: MOVIES_ACTION.FETCH_MOVIES_SUCCESS;
  payload: IFetchMoviesSuccessPayload;
}

interface FetchMoviesFailure {
  type: MOVIES_ACTION.FETCH_MOVIES_ERROR;
  error: string;
}

//search.................................................................

interface FetchSearchMoviesRequest {
  type: MOVIES_ACTION.FETCH_SEARCH_MOVIES;
  query: string;
  page: number;
}

interface FetchSearchMoviesSuccess {
  type: MOVIES_ACTION.FETCH_SEARCH_MOVIES_SUCCESS;
  payload: IFetchMoviesSuccessPayload;
}

interface FetchSearchMoviesFailure {
  type: MOVIES_ACTION.FETCH_SEARCH_MOVIES_ERROR;
  error: string;
}

export type MoviesActionsTypes =
  | FetchMoviesRequest
  | FetchMoviesSuccess
  | FetchMoviesFailure
  | FetchSearchMoviesRequest
  | FetchSearchMoviesSuccess
  | FetchSearchMoviesFailure;
