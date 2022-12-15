import { themeMode } from "../../types/apps";
import { IMovie } from "../../types/movie";
import { IUser } from "../../types/user";
import { UserActionTypes, USER_ACTION } from "./actionTypes";

export const SetUserAction = (
  login: string,
  password: string
): UserActionTypes => ({
  type: USER_ACTION.SET_USER,
  login,
  password,
});

export const SetCurrentUserAction = (user: IUser): UserActionTypes => ({
  type: USER_ACTION.SET_CURRENT_USER,
  user,
});

export const SetUserActionSuccess = (user: IUser): UserActionTypes => ({
  type: USER_ACTION.SET_USER_SUCCESS,
  user,
});

export const SetUserActionError = (message: string): UserActionTypes => ({
  type: USER_ACTION.SET_USER_ERROR,
  message,
});

export const UserLogoutAction = (): UserActionTypes => ({
  type: USER_ACTION.LOGOUT,
});

export const AddFavoriteMovieActions = (movie: IMovie): UserActionTypes => ({
  type: USER_ACTION.ADD_FAVORITE,
  movie,
});

export const DeleteFavoriteMovieActions = (id: number): UserActionTypes => ({
  type: USER_ACTION.DELETE_FAVORITE,
  id,
});

export const DeleteAccount = (): UserActionTypes => ({
  type: USER_ACTION.DELETE_ACCOUNT,
});

export const ChangeLocalActions = (local: string): UserActionTypes => ({
  type: USER_ACTION.CHANGE_LOCAL,
  local,
});

export const ChangeThemeActions = (theme: themeMode): UserActionTypes => ({
  type: USER_ACTION.CHANGE_THEME,
  theme,
});
