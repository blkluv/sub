import styled from "@emotion/styled";
import { Box, Button, Typography, Unstable_Grid2, Card, CardContent } from "@mui/material";
import { useIntercom } from "react-use-intercom";
import CheckIcon from "@mui/icons-material/Check";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

const EnterpriseBanner = () => {
  const { showNewMessages, update } = useIntercom();
  const handleEnterpriseContact = () => {
    showNewMessages("I'd like to upgrade to the enterprise plan");
    update({
      customAttributes: { enterpriseUpgradeRequested: true },
    });
  };

  return (
    <>
      <Card sx={{ marginTop: "1rem" }}>
        <Unstable_Grid2
          container
          sx={{ flexDirection: useMediaQuery("(max-width:600px)") ? "column" : "row" }}
        >
          <Unstable_Grid2
            sm={8}
            sx={{
              padding: "3rem 1rem",
              textAlign: "center",
              justifyContent: "center",
            }}
            container
            flexDirection={"column"}
            spacing={"1rem"}
          >
            <Unstable_Grid2>
              <Image height={32} width={32} src="/pinniedark.png" alt="Pinata logo" />
              <Image height={32} width={46} src="/submarine.png" alt="Submarine.me logo" />
            </Unstable_Grid2>
            <Unstable_Grid2>
              <Typography variant="h4">Enterprise</Typography>
            </Unstable_Grid2>
            <Unstable_Grid2>
              <Typography variant="subtitle2">
                For serious projects, brands, and organizations<br></br>that require
                enterprise-grade features, custom<br></br>packaging, and 1:1 support.
              </Typography>
            </Unstable_Grid2>
            <Unstable_Grid2>
              <Unstable_Grid2 container gap={".5rem"} sx={{ justifyContent: "center" }}>
                <CheckIcon style={{ color: "#56DB99" }} />
                <Typography variant="subtitle2">Everything in team plan</Typography>
              </Unstable_Grid2>
            </Unstable_Grid2>
          </Unstable_Grid2>
          <Unstable_Grid2
            sm={4}
            sx={{
              backgroundColor: "#FAFAFA",
              padding: "3rem 1rem",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            spacing={"1rem"}
            container
            flexDirection={"column"}
          >
            <Unstable_Grid2>
              <Typography variant="h2">Custom</Typography>
              <Typography variant="subtitle2">Reach out for a quote</Typography>
            </Unstable_Grid2>
            <Unstable_Grid2>
              <Button onClick={handleEnterpriseContact} color={"primary"}>
                Contact Us
              </Button>
            </Unstable_Grid2>
          </Unstable_Grid2>
        </Unstable_Grid2>
      </Card>
    </>
  );
};

export default EnterpriseBanner;
