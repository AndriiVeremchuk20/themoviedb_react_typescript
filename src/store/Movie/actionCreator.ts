import { Dispatch } from "react";
import { getMovie, getMovieVideoYoutube } from "../../servises/themoviebdAPI";
import { MovieActionsTypes, MOVIE_ACTION } from "./actionTypes";

export const fetchMovieInfoAction = (id: string) => {
  return async (dispatch: Dispatch<MovieActionsTypes>) => {
    dispatch({ type: MOVIE_ACTION.FETCH_MOVIE, id: id });
    const rMovie = await getMovie(id);
    const rVideo = await getMovieVideoYoutube(id);

    if (rMovie.success && rVideo.success) {
      dispatch({
        type: MOVIE_ACTION.FETCH_MOVIE_SUCCESS,
        payload: rMovie.payload,
        video: rVideo.payload,
      });
    } else {
      dispatch({
        type: MOVIE_ACTION.FETCH_MOVIE_ERROR,
        payload: rMovie.error ?? rVideo.error ?? "error",
      });
    }
  };
};
