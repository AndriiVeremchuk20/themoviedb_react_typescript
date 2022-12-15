import { IMovie } from "../../types/movie";
import { MoviesActionsTypes, MOVIES_ACTION } from "./actionTypes";

interface IMoviesState {
  movies: Array<IMovie>;
  currPage: number;
  total_pages: number;
  total_results: number;
  pending: boolean;
  isSearch: boolean;
  isError: boolean;
  error: string | null;
}

const initState: IMoviesState = {
  movies: [],
  currPage: 1,
  total_pages: 0,
  total_results: 0,
  pending: false,
  isSearch: false,
  isError: false,
  error: null,
};

export const moviesReducer = (
  state = initState,
  action: MoviesActionsTypes
): IMoviesState => {
  switch (action.type) {
    case MOVIES_ACTION.FETCH_MOVIES:
      return {
        ...state,
        pending: true,
        isSearch: false,
      };
    case MOVIES_ACTION.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.results,
        currPage: action.payload.page,
        total_pages: action.payload.total_pages,
        total_results: action.payload.total_results,
        pending: false,
        error: null,
        isSearch: false,
        isError: false,
      };
    case MOVIES_ACTION.FETCH_MOVIES_ERROR:
      return {
        ...state,
        pending: false,
        total_pages: 0,
        total_results: 0,
        currPage: 1,
        movies: [],
        error: action.error,
        isSearch: false,
        isError: true,
      };
    case MOVIES_ACTION.FETCH_SEARCH_MOVIES:
      return {
        ...state,
        pending: true,
        isSearch: true,
      };
    case MOVIES_ACTION.FETCH_SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        pending: false,
        movies: action.payload.results,
        total_pages: action.payload.total_pages,
        total_results: action.payload.total_results,
        error: null,
        isSearch: true,
        isError: false,
      };

    case MOVIES_ACTION.FETCH_SEARCH_MOVIES_ERROR:
      return {
        ...state,
        pending: false,
        total_pages: 0,
        total_results: 0,
        currPage: 1,
        movies: [],
        error: action.error,
        isSearch: true,
        isError: true,
      };
    default:
      return state;
  }
};
