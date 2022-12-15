import { localMode, themeMode } from "./apps";
import { IMovie } from "./movie";

export interface IUser {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  favoriteMovies: Array<IMovie>;
  userSetting: userSetting;
}

interface userSetting {
  local: string;
  theme: themeMode;
}
