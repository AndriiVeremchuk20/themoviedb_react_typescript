import { Dispatch } from "react";
import { themeMode } from "../../types/apps";
import { IMovie } from "../../types/movie";
import {
  deleteCurrUser,
  deleteUser,
  editedUsersData,
  getCurrUser,
  getUser,
  setCurrUser,
} from "../../utils/users";
import { UserActionTypes, USER_ACTION } from "./actionTypes";

export const setUser = (login: string, password: string) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: USER_ACTION.SET_USER, login, password });

    const user = getUser(login, password);

    if (user) {
      setTimeout(() => {
        dispatch({ type: USER_ACTION.SET_USER_SUCCESS, user: user });
      }, 1000);
      setCurrUser(user);
    } else {
      setTimeout(() => {
        dispatch({
          type: USER_ACTION.SET_USER_ERROR,
          message: "invalid login or password",
        });
      }, 1000);
    }
  };
};

export const setCurrentUser = () => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    const user = getCurrUser();
    if (user) {
      dispatch({ type: USER_ACTION.SET_USER_SUCCESS, user: user });
    }
  };
};

export const userLogout = () => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: USER_ACTION.LOGOUT });
    deleteCurrUser();
  };
};

export const addFavoriteMovie = (movie: IMovie) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: USER_ACTION.ADD_FAVORITE, movie: movie });

    const user = getCurrUser();
    if (user) editedUsersData(user);
  };
};

export const deleteFavoriteMovie = (id: number) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: USER_ACTION.DELETE_FAVORITE, id: id });

    const user = getCurrUser();
    if (user) editedUsersData(user);
  };
};

export const deleteAccount = (id: string) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    deleteUser(id);
    deleteCurrUser();
    dispatch({ type: USER_ACTION.DELETE_ACCOUNT });
  };
};

export const changeUserTheme = (theme: themeMode) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: USER_ACTION.CHANGE_THEME, theme: theme });

    const user = getCurrUser();
    if (user) editedUsersData(user);
  };
};

export const changeUserLocal = (local: string) => {
  return (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: USER_ACTION.CHANGE_LOCAL, local: local });

    const user = getCurrUser();
    if (user) editedUsersData(user);
  };
};
