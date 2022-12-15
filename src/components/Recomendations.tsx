import React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { IMovie } from "../types/movie";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import usePreventBodyScroll from "../hooks/usePreventBodyScroll";
import { MovieCard } from "./MovieCard";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const onWheel = (
  apiObj: scrollVisibilityApiType,
  ev: React.WheelEvent
): void => {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
};

interface PropsRecomendations {
  moviesList: Array<IMovie>;
}

export const Recomendations: React.FC<PropsRecomendations> = ({
  moviesList,
}) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const [t, i18n, ready] = useTranslation();

  return (
    <div
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
      style={{ width: "60vw", margin: "10px" }}
    >
      <ScrollMenu
        Header={<Typography variant="h5">{t("recomendations")}</Typography>}
        onWheel={onWheel}
      >
        {moviesList.map((item) => (
          <MovieCard movie={item} key={item.id} variant={"small"} />
        ))}
      </ScrollMenu>
    </div>
  );
};
