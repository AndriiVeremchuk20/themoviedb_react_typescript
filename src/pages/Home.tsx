import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import React, { ReactElement, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UpButton } from "../components/UpButton";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { MoviesList } from "../components/MoviesList";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Error } from "../components/Error";

export const Home: React.FC = (): ReactElement => {
  const { fetchPopularMoviesAction, fetchSearchMoviesAction } = useActions();
  const movies = useTypedSelector((state) => state.movies);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query");
  const currPage = searchParams.get("page");
  const { t } = useTranslation();

  const onChangePage = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      if (value === 1 && !queryParam) {
        navigate("/");
      } else {
        if (queryParam) {
          setSearchParams({ page: value + "", query: queryParam });
        } else {
          setSearchParams({ page: value + "" });
        }
      }
    },
    [queryParam, currPage]
  );

  useEffect(() => {
    if (queryParam && !currPage) {
      fetchSearchMoviesAction(queryParam);
    } else if (queryParam && currPage) {
      fetchSearchMoviesAction(queryParam, Number(currPage));
    } else if (!queryParam && currPage) {
      searchParams.delete("query");
      fetchPopularMoviesAction(Number(currPage));
    } else {
      searchParams.delete("query");
      fetchPopularMoviesAction();
    }

    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [searchParams]);

  if (movies.pending) {
    return <Loading />;
  }

  if (movies.isError) {
    return <Error />;
  }

  return (
    <Paper elevation={3} sx={{ minHeight: "100vh", maxHeight: "auto" }}>
      <Header variant="main" />
      {movies.total_results > 0 ? (
        <Grid
          container
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={0}
        >
          <Grid item sx={{ margin: { xs: "80px 0 0 0", md: "100px 0 0 0" } }}>
            <MoviesList movies={movies.movies} />
          </Grid>

          <Grid item my={4}>
            <Pagination
              page={currPage ? Number(currPage) : 1}
              count={movies.total_pages > 500 ? 500 : movies.total_pages}
              onChange={onChangePage}
              variant="outlined"
              color="primary"
              size="medium"
            />
          </Grid>
        </Grid>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={"90vh"}
        >
          <Typography variant="h3" sx={{ marginX: "10px" }}>
            {t("nothing_found_for")} "{searchParams.get("query")}" 😕
          </Typography>
        </Box>
      )}
      <UpButton />
      <Footer />
    </Paper>
  );
};
