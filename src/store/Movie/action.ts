import { IFetchVideo, IMovie } from "../../types/movie";
import { MovieActionsTypes, MOVIE_ACTION } from "./actionTypes";

export const FetchMovieAction = (id: string): MovieActionsTypes => ({
  type: MOVIE_ACTION.FETCH_MOVIE,
  id,
});

export const FetchMovieSuccessAction = (
  payload: IMovie,
  video: IFetchVideo
): MovieActionsTypes => ({
  type: MOVIE_ACTION.FETCH_MOVIE_SUCCESS,
  payload,
  video,
});

export const FetchMoviesErrorAction = (payload: string): MovieActionsTypes => ({
  type: MOVIE_ACTION.FETCH_MOVIE_ERROR,
  payload,
});
