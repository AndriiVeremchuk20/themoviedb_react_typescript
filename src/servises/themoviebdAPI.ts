import { ApiBaseURL, ApiKey } from "./config";

const perfomRequest = async (path: string) => {
  try {
    const r = await fetch(path);

    if (r.ok) {
      const dataJson = await r.json();
      // console.log("data respose = ", dataJson);
      return { success: true, payload: dataJson };
    }
    return { success: false, error: "Oops Something Went Wrong" };
  } catch (e) {
    return { success: false, error: "Oops Something Went Wrong" };
  }
};

export const getPopularMovies = async (page: number = 1) => {
  return perfomRequest(
    `${ApiBaseURL}/movie/popular?api_key=${ApiKey}&page=${page}`
  );
};

export const getMovie = async (id: string) => {
  return perfomRequest(
    `${ApiBaseURL}/movie/${id}?api_key=${ApiKey}&append_to_response=recommendations`
  );
};

export const getMovieVideoYoutube = async (id: string) => {
  return perfomRequest(`${ApiBaseURL}/movie/${id}/videos?api_key=${ApiKey}`);
};

export const searchMovies = async (q: string, page: number = 1) => {
  return perfomRequest(
    `${ApiBaseURL}/search/movie?api_key=${ApiKey}&query=${q}&page=${page}`
  );
};
