import { Themes } from "./theme/themes";
import * as rudderanalytics from "rudder-sdk-js";

type ThemeConfig = typeof Themes.light;
declare module "@emotion/react" {
  export interface Theme extends ThemeConfig {}
}

declare global {
  interface Window {
    rudderanalytics: typeof rudderanalytics & { initialized: boolean };
  }
}
