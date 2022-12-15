import { styled } from "@mui/material";
import React from "react";

interface PropsYouTubeVideo {
  videoKey: string;
}

export const YouTubeVideo: React.FC<PropsYouTubeVideo> = ({ videoKey }) => {
  return (
    <Root>
      <CustomIframe
        src={`https://www.youtube.com/embed/${videoKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Root>
  );
};

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const CustomIframe = styled("iframe")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    width: "80vw",
    height: "auto",
  },
  [theme.breakpoints.up("md")]: {
    width: "60vw",
    height: "60vh",
  },
}));
