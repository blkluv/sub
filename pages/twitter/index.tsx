import React, { useEffect } from "react";
import Loading from "../../components/Dashboard/Loading";
import { useRouter } from "next/router";
import { Unstable_Grid2 } from "@mui/material";

const Twitter = () => {
  const router = useRouter();

  useEffect(() => {
    const { oauth_token, oauth_verifier } = router.query;
    if (oauth_token && oauth_verifier) {
      const id = localStorage.getItem("sub-id");
      router.push(`/${id}?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`);
    }
  }, [router.query]);
  return (
    <Unstable_Grid2 container justifyContent={"center"}>
      <Loading />
    </Unstable_Grid2>
  );
};

export default Twitter;
