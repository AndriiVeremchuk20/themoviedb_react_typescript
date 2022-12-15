import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MovieCard } from "../components/MovieCard";
import { UpButton } from "../components/UpButton";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const Profile: React.FC = (): ReactElement => {
  const user = useTypedSelector((state) => state.user);
  const { deleteFavoriteMovie, userLogout, deleteAccount } = useActions();

  const { t } = useTranslation();

  const handleDeleteClick = (id: number) => {
    deleteFavoriteMovie(id);
  };

  const handleLogoutClick = () => {
    userLogout();
  };

  const handleDeleteAccountClick = () => {
    if (user.user) deleteAccount(user.user.id);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Paper
      elevation={2}
      sx={{
        minHeight: "100vh",
        maxHeight: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Header variant="one" />
      <Stack
        mt={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: { xs: "80%", md: "40%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "start",
            padding: "10px",
            margin: "0 0 10px 0",
          }}
        >
          <CardMedia
            sx={{
              maxWidth: "310px",
              borderRadius: "10%",
            }}
            component="img"
            alt={user.user?.name}
            src="https://i.pravatar.cc/300"
          />
          <CardContent>
            <Typography variant="h3">
              {user.user?.name} {user.user?.surname}
            </Typography>
            <hr />
            <Typography>{t("email")}: {user.user?.email}</Typography>
            <Typography>{t("phone")}: {user.user?.phone}</Typography>
            <ButtonGroup sx={{ margin: "30px 0 0 0" }}>
              <Button onClick={handleLogoutClick}>{t("logout")}</Button>
              <Button onClick={handleDeleteAccountClick}>{t("delete_account")}</Button>
            </ButtonGroup>
          </CardContent>
        </Card>
        {!user.user?.favoriteMovies ? (
          <Typography variant="h4">{t("see_later")}</Typography>
        ) : null}
        <Box
          sx={{
            display: "flex",
            width: { xs: "80%", md: "60%" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            flexWrap: "wrap",
            gridGap: "10px",
            margin: "20px 0",
          }}
        >
          {user.user?.favoriteMovies.map((movie) => (
            <Box
              key={movie.id}
              display="flex"
              flexDirection="column"
              sx={{ border: "solid 1px blue", borderRadius: "10px" }}
            >
              <MovieCard variant="small" movie={movie} />
              <Button
                onClick={() => {
                  handleDeleteClick(movie.id);
                }}
                variant="contained"
              >
                {t("delete")}
              </Button>
            </Box>
          ))}
        </Box>
        <UpButton />
        <Footer />
      </Stack>
    </Paper>
  );
};
