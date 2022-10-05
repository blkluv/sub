import ky from "ky";
import React, { useEffect, useState } from "react";
import MainLandingContent from "../../components/Content/MainLandingContent";
import PublicLayout from "../../components/Layout/PublicLayout";
import { getContentReturnObject } from "../api/content/[shortId]";

const Content = ({ data }: { data: getContentReturnObject & { error: any } }) => {
  const [isMissing, setIsMissing] = useState(false);
  const gatewayUrl = `https://${data.gatewayUrl}.${process.env.NEXT_PUBLIC_GATEWAY_ROOT}.cloud`;

  useEffect(() => {
    if (data && data.error) {
      setIsMissing(true);
    }
  }, [data]);

  return (
    <PublicLayout fileInfo={data}>
      <MainLandingContent missing={isMissing} fileInfo={data} gatewayUrl={gatewayUrl} />
    </PublicLayout>
  );
};

export async function getServerSideProps(context) {
  try {
    const host =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : "http://localhost:3001";

    const res = await ky(`${host}/api/content/${context.query.id}`, {
      method: "GET",
    });
    const data: getContentReturnObject = await res.json();
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return { props: { data: { error: true } } };
  }
}

export default Content;
