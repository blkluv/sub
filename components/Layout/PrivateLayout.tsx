import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated, selectUser } from "../../store/selectors/authSelectors";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Alert from "../Alert";
import { useIntercom } from "react-use-intercom";
import { Box, Container } from "@mui/material";
import UpgradeModal from "../Dashboard/UpgradeModal";
import { getKy } from "../../helpers/ky";

interface Props {
  children: React.ReactNode;
}

const NEW_PLANS = ["Picnic", "Fiesta", "Carnival", "Enterprise"];

const PrivateLayout: React.FC<Props> = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const { boot, shutdown } = useIntercom();

  useEffect(() => {
    boot({
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
    });
  }, []);

  useEffect(() => {
    !isAuthenticated && shutdown();
  }, [isAuthenticated]);

  useEffect(() => {
    if (router.isReady) {
      if (!isAuthenticated) {
        router.push({ pathname: "/auth", query: { from: router.asPath } });
      }
    }
  }, [isAuthenticated, router.isReady]);

  useEffect(() => {
    isAuthenticated && checkForPlan();
  }, [isAuthenticated]);

  const checkForPlan = async () => {
    if (router.pathname.includes("billing")) {
      return;
    }

    const userPlanInfo = await getUserBillingInfo();
    if (!userPlanInfo || !isValidPaidPlan(userPlanInfo)) {
      router.push("/billing");
    }
  };

  // TODO add loading spinner
  const layout = isAuthenticated ? (
    <>
      <Header />
      <Container maxWidth={"lg"} sx={{ marginTop: (theme) => theme.spacing(2) }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  ) : null;
  return layout;
};

export default PrivateLayout;

const isValidPaidPlan = (userPlanInfo) => {
  if (
    userPlanInfo?.subscriptionItems[0]?.type === "PROFESSIONAL" ||
    userPlanInfo?.subscriptionItems[0]?.type === "EXTRA_MANAGED_GATEWAY"
  ) {
    return true;
  }

  if (NEW_PLANS.includes(userPlanInfo?.plan?.nickname)) {
    return true;
  }

  return false;
};

const getUserBillingInfo = async () => {
  try {
    const ky = getKy();
    const res = await ky(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/billing/userStripeCustomer`);
    const userJson = await res.json();
    return userJson;
  } catch (error) {
    console.error(error);
    return null;
  }
};