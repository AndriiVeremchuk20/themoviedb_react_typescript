import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useActions } from "../hooks/useAction";
import { IUser } from "../types/user";

interface PropsUserAvatar {
  user: IUser;
}

export const UserAvatar: React.FC<PropsUserAvatar> = ({ user }) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { userLogout, deleteAccount } = useActions();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    userLogout();
  };

  const handleDeleteAccount = () => {
    deleteAccount(user.id);
  };

  return (
    <Box display="flex">
      <Button
        color="inherit"
        sx={{ cursor: "pointer" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Typography
          sx={{ margin: "0 10px" }}
          variant="body2"
        >{`${user.name} ${user.surname}`}</Typography>
        <Avatar alt={user.name} src="https://i.pravatar.cc/300" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfileClick}>{t("profile")}</MenuItem>
        <MenuItem onClick={handleLogoutClick}>{t("logout")}</MenuItem>
        <MenuItem onClick={handleDeleteAccount}>{t("delete_account")}</MenuItem>
      </Menu>
    </Box>
  );
};
