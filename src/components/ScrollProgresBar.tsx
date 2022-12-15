import React, { useCallback, useState } from "react";
import { LinearProgress } from "@mui/material";

export const ScrollProgresBar = () => {
  const [value, setValue] = useState<number>(
    document.documentElement.scrollTop / document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  );

  const handleScroll = useCallback(() => {
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    let height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setValue((winScroll / height) * 100);
  }, []);

  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      <LinearProgress variant="determinate" value={value} />
    </div>
  );
};
