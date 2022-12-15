import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fab, Tooltip, styled } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const UpButton = () => {
  const [showButton, setShowButton] = useState<boolean>(
    document.documentElement.scrollTop > 50
  );
  const { t } = useTranslation();

  const onScroll = useCallback(() => {
    if (document.documentElement.scrollTop > 50) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  window.addEventListener("scroll", onScroll);

  const handleClick = useCallback(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      {showButton ? (
        <Tooltip title={t("up")}>
          <CustFab color="primary" onClick={handleClick}>
            <ArrowUpwardIcon />
          </CustFab>
        </Tooltip>
      ) : null}
    </div>
  );
};

const CustFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
}));
