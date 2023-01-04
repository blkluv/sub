import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { IntercomProvider } from "react-use-intercom";
import { ThemeProvider } from "../theme/ThemeProvider";
import "../styles/pinataCustomStyles.css";
import { useEffect } from "react";
import * as FullStory from "@fullstory/browser";
const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "f4cld255";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  useEffect(() => {
    FullStory.init({ orgId: process.env.NEXT_PUBLIC_FS_ORG_ID as string });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <IntercomProvider appId={INTERCOM_APP_ID}>
          <Component {...props.pageProps} />
        </IntercomProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;

export function reportWebVitals(metric) {
  process.env.NEXT_PUBLIC_DEBUG && console.log(metric);
}
