import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { ThemeProvider } from "../theme/ThemeProvider";
import { IntercomProvider } from "react-use-intercom";
import { useEffect } from "react";
import * as FullStory from "@fullstory/browser";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    FullStory.init({ orgId: process.env.NEXT_PUBLIC_FS_ORG_ID as string });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;

export function reportWebVitals(metric) {
  localStorage.getItem("reportWebVitals") === "true" && console.log(metric);
}
