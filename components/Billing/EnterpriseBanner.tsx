import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { useIntercom } from "react-use-intercom";

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("./banners/enterprise.png"),
    linear-gradient(180deg, rgba(27, 7, 139, 1) 0%, rgba(85, 1, 152, 1) 100%);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 25vh;
`;
const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
`;
const P = styled.p`
  color: #fff;
  margin-bottom: 15px;
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
    <Container id={"enterprise-banner"}>
      <Content>
        <P>GET A PERSONALIZED PLAN</P>
        <H2>Enterprise</H2>
        <P>
          For serious projects, brands, and organizations that require enterprise-grade features,
          custom packaging, and 1:1 support.
        </P>
        <Button onClick={handleEnterpriseContact} color={"primary"}>
          Contact Us
        </Button>
      </Content>
    </Container>
  );
};

export default EnterpriseBanner;
