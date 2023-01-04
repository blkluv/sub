import BaseThemeProvider from "@mui/material/styles/ThemeProvider";

import { Themes } from "./themes";
import { useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/selectors/authSelectors";

export const ThemeProvider = ({ children }) => {
  const currentTheme = useAppSelector(selectTheme);
  const theme = Themes[currentTheme];
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>;
};
