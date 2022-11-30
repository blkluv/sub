import React, { useEffect } from "react";
import Loading from "../../components/Dashboard/Loading";
import { useRouter } from "next/router";

const Twitter = () => {
  const router = useRouter();

  useEffect(() => {
    const { oauth_token, oauth_verifier } = router.query;
    if (oauth_token && oauth_verifier) {
      const id = localStorage.getItem("sub-id");
      router.push(`/${id}?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`);
    }
  }, [router.query]);
  return <Loading />;
};

export default Twitter;
