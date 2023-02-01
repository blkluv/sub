import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Mulish:wght@900&family=Montserrat:wght@300&family=Open+Sans:wght@300&family=Oswald:wght@300&family=Roboto+Condensed:wght@300&family=Roboto:wght@300&family=Source+Sans+Pro:wght@300&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
