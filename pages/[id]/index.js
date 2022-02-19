import ky from "ky";
import React, { useEffect, useState } from "react";
import ContentLanding from "../../components/Content/ContentLanding";
import { mockData } from "../../components/Dashboard/mockData";
import { useRouter } from "next/router";
import Head from "next/head";

const Content = () => {
  const [fileInfo, setFileInfo] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (fileInfo) {
      setLoading(false);
    }
  }, [fileInfo]);

  const fetchContent = async () => {
    const { asPath } = router;
    console.log(window.location.pathname);
    console.log(`/api/content${asPath}`);
    const res = await ky(`/api/content${window.location.pathname}`, {
      method: "GET",
    });
    const json = await res.json();
    setFileInfo(json);
  };

  const pageData = mockData();
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href={fileInfo && fileInfo.thumbnail ? `https://opengateway.mypinata.cloud/ipfs/${fileInfo?.thumbnail}` : "/submarine.png"}></link>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content={fileInfo?.description}
        />
        <meta property="og:type" content="Web application" />
        <meta property="og:title" content={fileInfo?.name} />
        <meta
          property="og:description"
          content={fileInfo?.description}
        />
        <meta property="og:image" content={`https://opengateway.mypinata.cloud/ipfs/${fileInfo?.thumbnail}`} />
        <title>{fileInfo && fileInfo.name ? fileInfo.name : "Submarine Me"}</title>
      </Head>
      <ContentLanding
        pageData={pageData}
        loading={loading}
        fileInfo={fileInfo}
      />
    </div>
  );
};

export default Content;
