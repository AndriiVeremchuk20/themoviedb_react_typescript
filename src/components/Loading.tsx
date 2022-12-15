import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <Paper>
      <Grid
        container
        style={{ height: "100vh" }}
        justifyContent="center"
        alignItems={"center"}
      >
        <Grid
          container
          direction={"column"}
          justifyContent="center"
          alignItems={"center"}
        >
          <CircularProgress color="primary" size={100} />
          <Typography variant={"h4"} m={5}>
            {t("loading")}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
