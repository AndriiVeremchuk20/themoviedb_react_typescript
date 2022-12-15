import { themeMode } from "../../types/apps";

export enum APP {
  CHANGE_THEME = "@@CHANGE_THEME",
}

interface ChangeTheme {
  type: APP.CHANGE_THEME;
  theme: themeMode;
}

export type AppActionTypes = ChangeTheme;
