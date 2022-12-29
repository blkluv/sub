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
            <Unstable_Grid2 container justifyContent={"center"} alignItems={"center"} gap={".5rem"}>
              <Image height={46} width={33} src="/pinnie-dark.png" alt="Pinata logo" />
              <Typography variant="h6">+</Typography>
              <Image height={38} width={45} src="/submarine-dark.png" alt="Submarine.me logo" />
            </Unstable_Grid2>
            <Unstable_Grid2 marginTop={"1rem"}>
              <Typography variant="h4">Enterprise</Typography>
            </Unstable_Grid2>
            <Unstable_Grid2>
              <Typography variant="subtitle2" sx={{ opacity: ".6" }}>
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
            container
            flexDirection={"column"}
          >
            <Typography variant="h2">Custom</Typography>
            <Typography variant="subtitle2" sx={{ opacity: ".6" }}>
              Reach out for a quote
            </Typography>
            <Button onClick={handleEnterpriseContact} sx={{ width: "70%", marginTop: "1rem" }}>
              Contact Us
            </Button>
          </Unstable_Grid2>
        </Unstable_Grid2>
      </Card>
    </>
  );
};

export default EnterpriseBanner;
