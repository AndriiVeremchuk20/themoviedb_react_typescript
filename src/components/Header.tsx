import React, { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { ChangeTheme } from "./ChangeTheme";
import { SelectLanguage } from "./SelectLanguage";
import { ScrollProgresBar } from "./ScrollProgresBar";
import { SearchBar } from "./SearchBar";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { UserAvatar } from "./UserAvatar";

interface PropHeader {
  variant: "main" | "one";
}

export const Header: React.FC<PropHeader> = ({ variant }): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useTypedSelector((state) => state.user);

  return (
    <AppBar position={"fixed"} sx={{ padding: { xs: "2px", mb: "5px" } }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          {variant === "main" ? (
            <>
              <Box
                onClick={() => {
                  navigate("/");
                }}
                display="flex"
              >
                <Typography
                  variant="h4"
                  noWrap
                  sx={{
                    mr: 1,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".2rem",
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Get Movie
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                  }}
                  variant="h4"
                >
                  🎬
                </Typography>
              </Box>
            </>
          ) : (
            <Box display="flex">
              <Typography
                onClick={() => {
                  navigate("/");
                }}
                variant="h4"
                sx={{
                  margin: "0 20px 0 0",
                  cursor: "pointer",
                }}
              >
                🎬
              </Typography>
              <Typography
                variant="h4"
                onClick={() => {
                  navigate(-1);
                }}
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  fill="currentColor"
                  className="bi bi-arrow-left-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </Typography>
            </Box>
          )}
        </Box>

        <SearchBar />

        <Box width="5%" sx={{ display: { xs: "none", md: "block" } }}>
          <SelectLanguage />
        </Box>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <ChangeTheme />
        </Box>

        {user.user ? (
          <UserAvatar user={user.user} />
        ) : (
          <Box>
            <Typography sx={{ margin: "0 20px" }}>
              <a style={{ color: "white" }} href="/login">
                {t("login")}
              </a>
              /
              <a style={{ color: "white" }} href="/registration">
                {t("register")}
              </a>
            </Typography>
          </Box>
        )}
      </Toolbar>
      <ScrollProgresBar />
    </AppBar>
  );
};
