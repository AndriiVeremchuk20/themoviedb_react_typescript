import { Box, Button, Paper, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    margin: "0 0 10px 10px",
  },
};

export const NoPage: React.FC = (): ReactElement => {
  const navigate = useNavigate();
  const [t, i18n, ready] = useTranslation();

  return (
    <Paper style={styles.root}>
      <Box mx={5}>
        <Typography variant="h1">404</Typography>
        <Typography variant="body1" style={styles.text}>
          {t("404")}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          {t("go_to_homepage")}
        </Button>
      </Box>
    </Paper>
  );
};
