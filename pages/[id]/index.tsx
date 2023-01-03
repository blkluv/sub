import { Box } from "@mui/system";
import ky from "ky";
import MainLandingContent from "../../components/Content/MainLandingContent";
import PublicLayout from "../../components/Layout/PublicLayout";
import { getContentReturnObject } from "../api/content/[shortId]";

const Content = ({ data }: { data: getContentReturnObject & { error: any } }) => {
  const gatewayUrl = `https://${data.gatewayUrl}.${process.env.NEXT_PUBLIC_GATEWAY_ROOT}.cloud`;

  return (
    <PublicLayout fileInfo={data}>
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex" }}>
        <MainLandingContent missing={data.error} fileInfo={data} gatewayUrl={gatewayUrl} />
      </Box>
    </PublicLayout>
  );
};

export async function getServerSideProps(context) {
  try {
    const host = process.env.NEXT_PUBLIC_VERCEL_URL;
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const now = Date.now();
    const res = await ky(`${protocol}://${host}/api/content/${context.query.id}`, {
      method: "GET",
    });
    const data: getContentReturnObject = await res.json();
    process.env.debug &&
      console.log(Date.now() - now, " --> Time spent fetching content from DB (ms)");
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return { props: { data: { error: true } } };
  }
}

export default Content;
