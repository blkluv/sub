import { Container, Unstable_Grid2 } from "@mui/material";
import { Box } from "@mui/system";
import ky from "ky";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLandingContent from "../../components/Content/MainLandingContent";
import Loading from "../../components/Dashboard/Loading";
import PublicLayout from "../../components/Layout/PublicLayout";
import { getContentReturnObject } from "../api/content/[shortId]";

const Content = () => {
  const [data, setData] = useState<getContentReturnObject | null>();

  const gatewayUrl =
    data && `https://${data.gatewayUrl}.${process.env.NEXT_PUBLIC_GATEWAY_ROOT}.cloud`;
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) {
      return;
    }
    ky(`/api/content/${id}`, {
      method: "GET",
    })
      .then(async (data) => {
        const body = await data.json();
        setData(body);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex" }}>
        <Unstable_Grid2
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
          }}
        >
          <Loading />
        </Unstable_Grid2>
      </Box>
    );
  }
  return (
    <PublicLayout fileInfo={data}>
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex" }}>
        <MainLandingContent missing={!data} fileInfo={data} gatewayUrl={gatewayUrl} />
      </Box>
    </PublicLayout>
  );
};

export default Content;
