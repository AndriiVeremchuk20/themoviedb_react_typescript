import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { alpha, InputBase, styled, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [textQuery, setTextQuery] = useState<string>(
    searchParams.get("query") ?? ""
  );
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={textQuery}
          placeholder={`${t("search")}...`}
          inputProps={{ "aria-label": "search" }}
          onChange={(e: { target: { value: string } }) => {
            const text = e.target.value;
            if (text.length < 100) {
              setTextQuery(text);
            }
          }}
        />
      </Search>

      <Button
        type="submit"
        variant="contained"
        onClick={() => {
          if (textQuery) {
            setSearchParams({ query: textQuery });
            navigate(`/?query=${textQuery}`);
          } else {
            navigate(`/`);
          }
        }}
      >
        {t("search")}
      </Button>
    </Box>
  );
};


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 10,
  width: "25vw",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "50vw",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "90ch",
      "&:focus": {
        width: "90ch",
      },
    },
  },
}));