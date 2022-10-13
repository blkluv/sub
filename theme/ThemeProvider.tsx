import React from "react";
import { ThemeProvider as BaseThemeProvider } from "@mui/material";

import { Themes } from "./themes";
import { useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/selectors/authSelectors";

const ThemeProvider = ({ children }) => {
  const currentTheme = useAppSelector(selectTheme);
  const theme = Themes[currentTheme];
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;
};

export default ThemeProvider;
