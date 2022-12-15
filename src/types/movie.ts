export interface IMovie {
  adult: boolean;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  budget: number;
  revenue: number;
  runtime: number;
  recommendations?: IFetchMoviesSuccessPayload;
}

export interface IFetchMoviesSuccessPayload {
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export interface IFetchVideo {
  results: Array<fVideo>;
}

export interface fVideo {
  site: string;
  key: string;
  official: boolean;
}
