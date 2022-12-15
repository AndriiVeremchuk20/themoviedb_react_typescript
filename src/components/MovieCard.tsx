import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getGenresLine } from "../utils/getGenresLine";
import { IMAGES_PATH } from "../servises/config";
import { IMovie } from "../types/movie";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { matchMovie } from "../utils/matchMovie";

const styles = {
  title: {
    small: {
      height: "30px",
    },
    medium: {
      heihgt: "50px",
    },
  },
  overview: {
    medium: {
      height: "100px",
    },
    large: {
      height: "auto",
    },
  },

  typography: {
    large: {
      padding: "4px",
    },
  },
};

interface PropsMovieCard {
  movie: IMovie;
  variant: "small" | "medium" | "large";
}

export const MovieCard: React.FC<PropsMovieCard> = ({
  movie,
  variant = "small",
}) => {
  const navigate = useNavigate();

  const { addFavoriteMovie } = useActions();
  const user = useTypedSelector((state) => state.user);

  const { t } = useTranslation();

  return variant === "small" ? (
    <div
      onClick={() => {
        navigate(`/movie/${movie.id}`);
      }}
    >
      <Card sx={{ maxWidth: 200, minWidth: 200, margin: "10px" }}>
        <CardMedia
          component="img"
          height="300"
          image={`${IMAGES_PATH}/w300${movie.poster_path}`}
          alt={movie.title}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={styles.title.small}
          >
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  ) : variant === "medium" ? (
    <Root>
      <Card sx={{ width: 360 }}>
        <div
          onClick={() => {
            navigate(`/movie/${movie.id}`);
          }}
        >
          <CardMedia
            component="img"
            height="500"
            image={`${IMAGES_PATH}/w300${movie.poster_path}`}
            alt={movie.title}
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={styles.title.medium}
            >
              {movie.title.split(" ").slice(0, 4).join(" ")}
            </Typography>

            <Box display={"flex"} justifyContent={"space-between"} my={2}>
              <Typography>
                {getGenresLine(movie.genre_ids).slice(0, 2).join(", ")}
              </Typography>
              <Rating
                defaultValue={movie.vote_average / 2}
                precision={0.1}
                readOnly
              />
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              style={styles.overview.medium}
            >
              {movie.overview.substring(0, 200) + "..."}
            </Typography>
          </CardContent>
        </div>

        <CardActions>
          {user.user ? (
            matchMovie(movie.id, user.user.favoriteMovies) ? (
              <Typography variant="h6" margin="5px 5px " color="iherit">
                {t("card_movie_addet_message")} ✅
              </Typography>
            ) : (
              <Button
                size="large"
                onClick={() => {
                  addFavoriteMovie(movie);
                }}
              >
                {t("cardButton")}
              </Button>
            )
          ) : (
            <Alert severity="info">
              {t("cardAlert")} <Link to="/login">{t("login")}</Link>
            </Alert>
          )}
        </CardActions>
      </Card>
    </Root>
  ) : (
    <Root>
      <CardC>
        <CardMedia
          sx={{ maxWidth: 300, alignSelf: "center" }}
          height={"auto"}
          width="100px"
          component={"img"}
          image={`${IMAGES_PATH}/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent sx={{ width: "100%" }}>
          <Box
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box
              display="flex"
              width={"100%"}
              justifyContent="space-between"
              mb={2}
              pb={1}
              sx={{ borderBottom: "solid 3px lightblue" }}
            >
              <Typography gutterBottom variant="h4" component="div">
                {movie.title}
              </Typography>
              <Typography style={styles.typography.large}>
                <Rating
                  defaultValue={movie.vote_average / 2}
                  precision={0.1}
                  readOnly
                />
              </Typography>
            </Box>

            <Box>
              <Typography style={styles.typography.large}>
                {t("release_date")}: {movie.release_date}
              </Typography>
              <Typography style={styles.typography.large}>
                {t("original_language")}: {movie.original_language}
              </Typography>
              <Typography style={styles.typography.large}>
                {t("budget")}: {movie.budget}$
              </Typography>
              <Typography style={styles.typography.large}>
                {t("revenue")}: {movie.revenue}
              </Typography>
              <Typography style={styles.typography.large}>
                {t("runtime")}: {movie.runtime} {t("runtime_time")}.
              </Typography>
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              style={styles.overview.large}
            >
              {movie.overview}
            </Typography>

            {user.user ? (
              matchMovie(movie.id, user.user.favoriteMovies) ? (
                <Typography variant="h6" margin="normal">
                  {t("card_movie_addet_message")} ✅
                </Typography>
              ) : (
                <Button
                  size="large"
                  onClick={() => {
                    addFavoriteMovie(movie);
                  }}
                >
                  {t("cardButton")}
                </Button>
              )
            ) : (
              <Alert severity="info">
                {t("cardAlert")} <Link to="/login">{t("login")}</Link>
              </Alert>
            )}
          </Box>
        </CardContent>
      </CardC>
    </Root>
  );
};


const Root = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
}));

const CardC = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    width: "80vw",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
    width: "60vw",
  },
}));
