import { themeMode } from "../types/apps";

export const getBrovserTheme = (): themeMode => {
  return window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: ${themeMode.dark})`).matches
    ? themeMode.dark
    : themeMode.light;
};
