import { Dispatch } from "react";
import { getPopularMovies, searchMovies } from "../../servises/themoviebdAPI";
import { MoviesActionsTypes, MOVIES_ACTION } from "./actionTypes";

export const fetchPopularMoviesAction = (page: number = 1) => {
  return async (dispatch: Dispatch<MoviesActionsTypes>) => {
    dispatch({ type: MOVIES_ACTION.FETCH_MOVIES, page: page });
    const r = await getPopularMovies(page);
    if (r.success) {
      dispatch({
        type: MOVIES_ACTION.FETCH_MOVIES_SUCCESS,
        payload: r.payload,
      });
    } else {
      dispatch({
        type: MOVIES_ACTION.FETCH_MOVIES_ERROR,
        error: r.error ?? "Oops -_-",
      });
    }
  };
};

export const fetchSearchMoviesAction = (query: string, page: number = 1) => {
  return async (dispatch: Dispatch<MoviesActionsTypes>) => {
    dispatch({
      type: MOVIES_ACTION.FETCH_SEARCH_MOVIES,
      query: query,
      page: page,
    });
    const r = await searchMovies(query, page);
    if (r.success) {
      dispatch({
        type: MOVIES_ACTION.FETCH_SEARCH_MOVIES_SUCCESS,
        payload: r.payload,
      });
    } else {
      dispatch({
        type: MOVIES_ACTION.FETCH_SEARCH_MOVIES_ERROR,
        error: r.error ?? "Ops -_-",
      });
    }
  };
};
