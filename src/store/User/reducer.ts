import { IUser } from "../../types/user";
import { setCurrUser } from "../../utils/users";
import { UserActionTypes, USER_ACTION } from "./actionTypes";

interface UserState {
  user: IUser | null;
  pending: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  pending: false,
  error: null,
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case USER_ACTION.SET_CURRENT_USER:
      return {
        ...state,
        user: action.user,
        pending: false,
        error: null,
      };
    case USER_ACTION.SET_USER:
      return {
        ...state,
        pending: true,
      };
    case USER_ACTION.SET_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.user,
        error: null,
      };

    case USER_ACTION.SET_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.message,
        user: null,
      };

    case USER_ACTION.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case USER_ACTION.ADD_FAVORITE:
      if (state.user) {
        if (state.user.favoriteMovies.length >= 20)
          state.user.favoriteMovies.pop();

        state = {
          ...state,
          user: {
            ...state.user,
            favoriteMovies: [action.movie, ...state.user.favoriteMovies],
          },
        };

        if (state.user) setCurrUser(state.user);
      }
      return {
        ...state,
      };

    case USER_ACTION.DELETE_FAVORITE:
      if (state.user) {
        state = {
          ...state,
          user: {
            ...state.user,
            favoriteMovies: state.user.favoriteMovies.filter(
              (item) => item.id !== action.id
            ),
          },
        };

        if (state.user) {
          setCurrUser(state.user);
        }
      }
      return {
        ...state,
      };

    case USER_ACTION.DELETE_ACCOUNT:
      return {
        ...state,
        user: null,
      };

    case USER_ACTION.CHANGE_LOCAL:
      if (state.user) {
        state = {
          ...state,
          user: {
            ...state.user,
            userSetting: { ...state.user.userSetting, local: action.local },
          },
        };

        if (state.user) {
          setCurrUser(state.user);
        }
      }
      return {
        ...state,
      };

    case USER_ACTION.CHANGE_THEME:
      if (state.user) {
        state = {
          ...state,
          user: {
            ...state.user,
            userSetting: { ...state.user.userSetting, theme: action.theme },
          },
        };

        if (state.user) {
          setCurrUser(state.user);
        }
      }
      return {
        ...state,
      };

    default:
      return state;
  }
};
