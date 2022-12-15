import { themeMode } from "../../types/apps";
import { APP, AppActionTypes } from "./actionType";

export const ChangeThemeAction = (theme: themeMode): AppActionTypes => ({
  type: APP.CHANGE_THEME,
  theme,
});
