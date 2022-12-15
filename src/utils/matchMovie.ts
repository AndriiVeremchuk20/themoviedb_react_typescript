import { IMovie } from "../types/movie";

export const matchMovie = (id: number, listMovie: Array<IMovie>): boolean => {
  return listMovie.some((item) => item.id === id);
};
