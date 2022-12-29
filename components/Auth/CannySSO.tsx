import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { getKy } from "../../helpers/ky";
import { selectUser } from "../../store/selectors/authSelectors";
import { CircularProgress, Typography, Unstable_Grid2 } from "@mui/material";

const CannySSO = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { companyID, redirect } = router.query;
  const ky = getKy();

  useEffect(() => {
    user &&
      ky
        .post("/api/canny/getToken", {
          json: {
            name: user.firstname + " " + user.lastname,
          },
        })
        .json()
        .then((res) =>
          router.push(
            "https://canny.io/api/redirects/sso?companyID=" +
              companyID +
              "&ssoToken=" +
              res +
              "&redirect=" +
              redirect
          )
        );
  }, [user]);

  return (
    <Unstable_Grid2
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant={"h5"}>In a moment you will be redirected to Canny</Typography>
      <CircularProgress />
    </Unstable_Grid2>
  );
};

export default CannySSO;
