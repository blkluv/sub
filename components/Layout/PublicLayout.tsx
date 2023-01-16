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

// Layout to be used on preview pages only. No Auth.
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

        <title>{fileInfo && fileInfo.name ? fileInfo.name : "Submarine.me"}</title>
      </Head>
      {children}

      <Box sx={{ position: "fixed", bottom: "15px", right: "15px", zIndex: 10 }}>
        <Pinnie />
      </Box>
    </>
  );
};

export default PublicLayout;
