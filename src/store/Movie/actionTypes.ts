// import {
//     IFetchMoviesFailurePayload,
//     IFetchMoviesSuccessPayload,
//   } from "../../types/movie";

import { IFetchVideo, IMovie } from "../../types/movie";

export enum MOVIE_ACTION {
  FETCH_MOVIE = "@@FETCH_MOVIE",
  FETCH_MOVIE_SUCCESS = "@@FETCH_MOVIE_SUCCESS",
  FETCH_MOVIE_ERROR = "@@FETCH_MOVIE_ERROR",
}

interface FetchMovieRequest {
  type: MOVIE_ACTION.FETCH_MOVIE;
  id: string;
}

interface FetchMovieSuccess {
  type: MOVIE_ACTION.FETCH_MOVIE_SUCCESS;
  payload: IMovie;
  video: IFetchVideo;
}

interface FetchMovieFailure {
  type: MOVIE_ACTION.FETCH_MOVIE_ERROR;
  payload: string;
}

export type MovieActionsTypes =
  | FetchMovieRequest
  | FetchMovieSuccess
  | FetchMovieFailure;
