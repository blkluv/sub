import React from "react";
import Head from "next/head";
import Alert from "../Alert";
import Script from "next/script";

const SharedHead = () => {
  return (
    <>
      <Alert />
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LDJ4RPGPGE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-LDJ4RPGPG');
        `}
      </Script>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Submarine Me - Unlock Exlusive Content With An NFT" />
        <meta property="og:type" content="Web application" />
        <meta property="og:title" content="Submarine Me - By Pinata" />
        <meta
          property="og:description"
          content="Submarine Me - Unlock Exlusive Content With An NFT"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image"
          content="https://gateway.submarine.me/ipfs/QmWzia1qwTKT4SdRw3923uxkyT8trBLim75bNKfxtoLzwR?filename=submarine_preview.png"
        />
        <title>Submarine Me - By Pinata</title>
        <link rel="icon" href="/submarine.png"></link>
      </Head>
    </>
  );
};

export default SharedHead;
