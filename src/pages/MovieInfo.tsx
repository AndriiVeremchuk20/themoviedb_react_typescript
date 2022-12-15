import { Alert, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { MovieCard } from "../components/MovieCard";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Recomendations } from "../components/Recomendations";
import { YouTubeVideo } from "../components/YouTubeVideo";
import { Header } from "../components/Header";
import { useTranslation } from "react-i18next";
import { UpButton } from "../components/UpButton";
import { Footer } from "../components/Footer";

export const MovieInfo = () => {
  const { movieId } = useParams();
  const { t } = useTranslation();

  const { fetchMovieInfoAction } = useActions();
  const movie = useTypedSelector((state) => state.movie);

  useEffect(() => {
    if (movieId) {
      fetchMovieInfoAction(movieId);
    }
    window.scrollTo(0, 0);
  }, [movieId]);

  if (movie.pending) {
    return <Loading />;
  } else if (movie.error) {
    return <Alert severity="error">{movie.error}</Alert>;
  }

  return (
    <Paper elevation={3} sx={{ minHeight: "100vh", maxHeight: "auto" }}>
      <Header variant="one" />

      {movie.movie ? (
        <Grid
          spacing={2}
          container
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {movie.movie.adult ? (
            <Grid item>
              <Alert severity="error">{t("18+")} 🔞</Alert>
            </Grid>
          ) : null}

          <Grid item sx={{ marginTop: { sx: "100px", md: "100px" } }}>
            <MovieCard variant="large" movie={movie.movie} />
          </Grid>

          <Grid item alignSelf="center">
            {movie.video && movie.video.results[0] ? (
              <YouTubeVideo videoKey={movie.video.results[0].key} />
            ) : (
              <Alert
                severity="warning"
                sx={{ width: { lg: "60vw", xs: "80vw" } }}
              >
                <Typography variant="h6">{t("video_not_found")}</Typography>
              </Alert>
            )}
          </Grid>

          <Grid item alignSelf={"center"}>
            {movie.movie.recommendations &&
            movie.movie.recommendations.results.length > 0 ? (
              <Recomendations
                moviesList={movie.movie.recommendations.results}
              />
            ) : (
              <Alert
                severity="warning"
                sx={{ width: { lg: "60vw", xs: "80vw" } }}
              >
                <Typography variant="h6">
                  {t("recomendations_not_found")}
                </Typography>
              </Alert>
            )}
          </Grid>
        </Grid>
      ) : null}
      <UpButton />
      <Footer />
    </Paper>
  );
};
