import React from "react";
import { Box, Grid } from "@mui/material";
import { MovieCard } from "./MovieCard";
import { IMovie } from "../types/movie";

interface PropsMovieList {
  movies: Array<IMovie>;
}

export const MoviesList: React.FC<PropsMovieList> = ({ movies }) => {
  return (
    <Box display="flex" justifyContent={"center"}>
      <Grid container width={"80%"} spacing={1}>
        {movies.map((movie) => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} variant={"medium"} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
