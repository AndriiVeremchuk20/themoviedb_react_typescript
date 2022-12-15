import { Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Error = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/TlYmmXR5CGE/maxresdefault.jpg)`,
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Paper elevation={1}>
        <Typography ml={10} variant="h2">
          {t("errorPending")}
        </Typography>
      </Paper>
    </div>
  );
};
