import { Dispatch } from "react";
import { themeMode } from "../../types/apps";
import { APP, AppActionTypes } from "./actionType";

export const changeTheme = (theme: themeMode) => {
  return (dispatch: Dispatch<AppActionTypes>) => {
    dispatch({ type: APP.CHANGE_THEME, theme });
  };
};
