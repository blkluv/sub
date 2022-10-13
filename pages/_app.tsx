import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { IntercomProvider } from "react-use-intercom";
import ThemeProvider from "../theme/ThemeProvider";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "f4cld255";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
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
