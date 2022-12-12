import styled from "@emotion/styled";
import { Box, Button, Typography, Unstable_Grid2, Card, CardContent } from "@mui/material";
import { useIntercom } from "react-use-intercom";
import CheckIcon from "@mui/icons-material/Check";

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 25vh;
  box-shadow: 4px 12px 40px rgba(0, 0, 0, 0.09);
`;
const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
`;
const H2 = styled.h2`
  color: #fff;
  margin-bottom: 15px;
`;
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
        <Unstable_Grid2 container>
          <Unstable_Grid2
            xs={8}
            sx={{ padding: "3rem 1rem", textAlign: "center", justifyContent: "center" }}
            container
            flexDirection={"column"}
            spacing={"1rem"}
          >
            <Unstable_Grid2>
              <Typography variant="h4">Enterprise</Typography>
            </Unstable_Grid2>
            <Unstable_Grid2>
              <Typography variant="subtitle2">
                For serious projects, brands, and organizations
              </Typography>
              <Typography variant="subtitle2">
                that require enterprise-grade features, custom
              </Typography>
              <Typography variant="subtitle2">packaging, and 1:1 support.</Typography>
            </Unstable_Grid2>
            <Unstable_Grid2>
              <Unstable_Grid2 container gap={".5rem"} sx={{ justifyContent: "center" }}>
                <CheckIcon style={{ color: "#56DB99" }} />
                <Typography variant="subtitle2">Everything in team plan</Typography>
              </Unstable_Grid2>
            </Unstable_Grid2>
          </Unstable_Grid2>
          <Unstable_Grid2
            xs={4}
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
