import { ThemeProvider } from "@mui/material/styles";

import { Themes } from "./themes";
import { useAppSelector } from "../store/hooks";
import { selectTheme } from "../store/selectors/authSelectors";

export default function CustomThemeProvider({ children }) {
  const currentTheme = useAppSelector(selectTheme);
  const theme = Themes[currentTheme];
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
