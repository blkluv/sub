import { Box } from "@mui/system";
import MainLandingContent from "../../components/Content/MainLandingContent";
import PublicLayout from "../../components/Layout/PublicLayout";
import { getAllContentIds, getUserContentCombo } from "../../repositories/content";
import { getContentReturnObject } from "../api/content/[shortId]";

const Content = ({ data }: { data: getContentReturnObject & { error: any } }) => {
  const gatewayUrl = `https://${data.gatewayUrl}.${process.env.NEXT_PUBLIC_GATEWAY_ROOT}.cloud`;
  return (
    <PublicLayout fileInfo={data}>
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex" }}>
        <MainLandingContent fileInfo={data} gatewayUrl={gatewayUrl} />
      </Box>
    </PublicLayout>
  );
};

export async function getStaticPaths() {
  const ids = await getAllContentIds();
  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  try {
    const now = Date.now();
    const content = await getUserContentCombo(params.id); // N+1 situation, should be improved
    if (!content) {
      return { notFound: true };
    }
    const data = {
      id: content.id,
      name: content.name,
      description: content.description,
      thumbnail: content.thumbnail,
      submarineCID: content.submarine_cid,
      unlockInfo: content.unlock_info,
      shortId: content.short_id,
      customizations: content.customizations,
      gatewayUrl: content.Users.pinata_gateway_subdomain,
    };
    process.env.NEXT_PUBLIC_DEBUG &&
      console.log(Date.now() - now, " --> Time spent fetching content from DB (ms)");

    return { props: { data } };
  } catch (error) {
    console.log(error);
    return { props: { data: { error: true } } };
  }
}

export default Content;
