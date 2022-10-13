import { Themes } from "./theme/themes";
type ThemeConfig = typeof Themes.light;
declare module "@emotion/react" {
  export interface Theme extends ThemeConfig {}
}
