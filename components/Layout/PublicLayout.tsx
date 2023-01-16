import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import { getContentReturnObject } from "../../pages/api/content/[shortId]";
import Alert from "../Alert";
import Pinnie from "../Pinnie";

interface Props {
  children: React.ReactNode;
  fileInfo?: getContentReturnObject;
}

const PublicLayout = ({ children, fileInfo }: Props) => {
  const gatewayUrl = fileInfo?.gatewayUrl;
  return (
    <>
      <Alert />
      <Head>
        <link
          rel="icon"
          href={
            fileInfo && fileInfo.thumbnail
              ? `${gatewayUrl}/ipfs/${fileInfo?.thumbnail}`
              : "/submarine.png"
          }
        ></link>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={fileInfo?.description} />
        <meta property="og:type" content="Web application" />
        <meta
          property="og:title"
          content={fileInfo && fileInfo.name ? fileInfo?.name : "Submarine.me"}
        />
        <meta
          property="og:description"
          content={
            fileInfo && fileInfo.name
              ? fileInfo?.description
              : "Locked content powered by Submarine.me"
          }
        />
        <meta
          property="og:image"
          content={
            fileInfo && fileInfo.thumbnail
              ? `${gatewayUrl}/ipfs/${fileInfo?.thumbnail}`
              : "https://ipfs.submarine.me/ipfs/QmWzia1qwTKT4SdRw3923uxkyT8trBLim75bNKfxtoLzwR?filename=submarine_preview.png"
          }
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Montserrat:wght@300&family=Open+Sans:wght@300&family=Oswald:wght@300&family=Roboto+Condensed:wght@300&family=Roboto:wght@300&family=Source+Sans+Pro:wght@300&display=swap"
          rel="stylesheet"
        ></link>
        <title>{fileInfo && fileInfo.name ? fileInfo.name : "Submarine.me"}</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LDJ4RPGPGE"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-LDJ4RPGPGE');`,
          }}
        />
      </Head>
      {children}

      <Box sx={{ position: "fixed", bottom: "15px", right: "15px", zIndex: 10 }}>
        <Pinnie />
      </Box>
    </>
  );
};

export default PublicLayout;
