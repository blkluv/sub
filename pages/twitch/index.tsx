import React, { useEffect } from "react";
import Loading from "../../components/Dashboard/Loading";
import { useRouter } from "next/router";
import { getKy } from "../../helpers/ky";

const Twitch = () => {
  const router = useRouter();
  const ky = getKy();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    var params = {};
    hash.split("&").map((hk) => {
      let temp = hk.split("=");
      params[temp[0]] = temp[1];
    });
    const id = localStorage.getItem("twitch-sub-id");
    router.push(`/${id}?access_token=${params["access_token"]}&state=${params["state"]}`);
  }, []);

  return <Loading />;
};
export default Twitch;
