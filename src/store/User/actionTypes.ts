import { themeMode } from "../../types/apps";
import { IMovie } from "../../types/movie";
import { IUser } from "../../types/user";

export enum USER_ACTION {
  SET_USER = "@@SET_USER",
  SET_USER_SUCCESS = "@@SET_USER_SUCCESS",
  SET_USER_ERROR = "@@SET_USER_ERROR",
  SET_CURRENT_USER = "@@SET_CURRENT_USER",

  ADD_FAVORITE = "@@ADD_FAVORITE",
  DELETE_FAVORITE = "@@DELETE_FAVORITE",

  LOGOUT = "@@LOGOUT",
  DELETE_ACCOUNT = "@@DELETE_ACCOUNT",

  CHANGE_THEME = "@@CHANGE_THEME",
  CHANGE_LOCAL = "@@CHANGE_LOCAL",
}

interface SetUser {
  type: USER_ACTION.SET_USER;
  login: string;
  password: string;
}

interface SetCurrentUser {
  type: USER_ACTION.SET_CURRENT_USER;
  user: IUser;
}

interface SetUserSuccess {
  type: USER_ACTION.SET_USER_SUCCESS;
  user: IUser;
}

interface SetUserError {
  type: USER_ACTION.SET_USER_ERROR;
  message: string;
}

interface Logout {
  type: USER_ACTION.LOGOUT;
}

interface AddFavoriteMovie {
  type: USER_ACTION.ADD_FAVORITE;
  movie: IMovie;
}

interface DeleteFavoriteMovie {
  type: USER_ACTION.DELETE_FAVORITE;
  id: number;
}

interface DeleteAccount {
  type: USER_ACTION.DELETE_ACCOUNT;
}

interface ChangeTheme {
  type: USER_ACTION.CHANGE_THEME;
  theme: themeMode;
}

interface ChangeLocal {
  type: USER_ACTION.CHANGE_LOCAL;
  local: string;
}

export type UserActionTypes =
  | SetUser
  | SetUserSuccess
  | SetUserError
  | SetCurrentUser
  | Logout
  | DeleteAccount
  | AddFavoriteMovie
  | DeleteFavoriteMovie
  | ChangeTheme
  | ChangeLocal;
