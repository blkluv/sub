import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import { IntercomProvider } from "react-use-intercom";

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "f4cld255";

function MyApp({ Component, pageProps }) {
  return (
    <IntercomProvider appId={INTERCOM_APP_ID}>
      <Component {...pageProps} />;
    </IntercomProvider>
  );
}

export default MyApp;
