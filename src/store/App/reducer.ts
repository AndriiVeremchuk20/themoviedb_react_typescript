import { themeMode } from "../../types/apps";
import { getBrovserTheme } from "../../utils/getBrowserTheme";
import { APP, AppActionTypes } from "./actionType";

interface AppState {
  currTheme: themeMode;
}

const initialState: AppState = {
  currTheme: getBrovserTheme(),
};

export const appReducer = (
  state = initialState,
  action: AppActionTypes
): AppState => {
  switch (action.type) {
    case APP.CHANGE_THEME:
      return {
        ...state,
        currTheme: action.theme,
      };
    default:
      return state;
  }
};
