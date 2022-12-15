import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select } from "@mui/material";
import { localMode } from "../types/apps";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useAction";

export const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const user = useTypedSelector((state) => state.user);
  const { changeUserLocal } = useActions();

  const handleChangeLanguage = useCallback(
    (e: { target: { value: string } }) => {
      const value = e.target.value;
      if (value === localMode.en || value === localMode.ua) {
        if (user.user) {
          changeUserLocal(value);
        }
        i18n.changeLanguage(value);
      }
    },
    []
  );

  return (
    <FormControl fullWidth>
      <Select value={i18n.language} onChange={handleChangeLanguage}>
        <MenuItem hidden>🌏</MenuItem>
        <MenuItem value={localMode.en}>🇺🇸 EN</MenuItem>
        <MenuItem value={localMode.ua}>🇺🇦 UA</MenuItem>
      </Select>
    </FormControl>
  );
};
