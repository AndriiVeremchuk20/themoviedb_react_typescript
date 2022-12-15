import { IFetchVideo, IMovie } from "../../types/movie";
import { MovieActionsTypes, MOVIE_ACTION } from "./actionTypes";

interface IMovieState {
  movie: IMovie | null;
  pending: boolean;
  error: string | null;
  video: IFetchVideo | null;
}

const initState: IMovieState = {
  movie: null,
  pending: false,
  error: null,
  video: null,
};

export const movieReducer = (
  state = initState,
  action: MovieActionsTypes
): IMovieState => {
  switch (action.type) {
    case MOVIE_ACTION.FETCH_MOVIE:
      return {
        ...state,
        pending: true,
      };
    case MOVIE_ACTION.FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        movie: action.payload,
        video: action.video,
        pending: false,
        error: null,
      };
    case MOVIE_ACTION.FETCH_MOVIE_ERROR:
      return {
        ...state,
        pending: false,
        movie: null,
        video: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
