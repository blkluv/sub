import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, Typography, Unstable_Grid2 } from "@mui/material";
import { BillingPlan, Plan } from "../../../store/legacy/billing/types";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";

interface CardPricingProps {
  plan: BillingPlan;
  action: any;
  currentPlan: Plan | null;
  nextPlan: Plan | null;
  disabled: boolean;
}

const Banner = styled(Box)`
  position: absolute;
  bottom: 0.7rem;
  right: -1rem;
  color: black;
  background-color: #fcf46a;
  border-radius: 0.25rem;
  border: 1px solid black;
  font-weight: 300;
  font-align: center;
  padding: 0 0.25rem 0 0.25rem;
  paddingright: 0.25rem;
`;
const CardPricing = ({ plan, action, currentPlan, nextPlan, disabled }: CardPricingProps) => {
  const hasCouponBanner = plan.type === 1 && localStorage.getItem("newUser") === "true";
  return (
    <Card
      sx={{
        padding: "2rem .5rem",
        height: "100%",
        width: "100%",
        backgroundColor: currentPlan?.type === plan.type ? "#2a40d7" : "white",
        color: currentPlan?.type === plan.type ? "white" : "#56DB99",
        "& .MuiTypography-root": {
          color: currentPlan?.type === plan.type ? "white" : "black",
        },
        boxShadow: "4px 12px 40px rgba(0, 0, 0, 0.09)",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Unstable_Grid2 container flexDirection={"column"}>
          <Unstable_Grid2>
            {hasCouponBanner && (
              <Box sx={{ position: "relative" }}>
                <Banner>
                  <Typography fontSize={14}>
                    Promo code: <p style={{ display: "inline", fontWeight: 800 }}>SUB30</p>
                  </Typography>
                </Banner>
              </Box>
            )}
            <Unstable_Grid2 container sx={{ alignItems: "center", gap: ".5rem" }}>
              <Image
                height={46}
                width={33}
                src={currentPlan?.type === plan.type ? "/pinnie-white.png" : "/pinnie-dark.png"}
                alt="Pinata logo"
              />
              {plan.type !== 0 && (
                <>
                  <Typography variant="h6">+</Typography>
                  <Image
                    height={38}
                    width={45}
                    src={
                      currentPlan?.type === plan.type
                        ? "/submarine-white.png"
                        : "/submarine-dark.png"
                    }
                    alt="Submarine.me logo"
                  />
                </>
              )}
            </Unstable_Grid2>
          </Unstable_Grid2>

          <Unstable_Grid2>
            <Typography sx={{ color: "#00adb5" }} variant="h4">
              {plan.nickname}
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: ".6" }}>
              {plan.subtitle}
            </Typography>
          </Unstable_Grid2>

          <Unstable_Grid2>
            <Typography variant="h2">{"$" + plan.price}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: ".6" }}>
              {plan.type == 0 ? "For a lifetime" : "/month"}{" "}
            </Typography>

            <Unstable_Grid2>
              {plan?.features?.length > 0 &&
                plan.features.map((feature, index) => {
                  return (
                    <Unstable_Grid2 container gap={".5rem"} key={`feature_${index}`}>
                      <CheckIcon />
                      <Typography variant="subtitle2">{feature}</Typography>
                    </Unstable_Grid2>
                  );
                })}
              {disabled && (
                <Unstable_Grid2>
                  <Typography variant="subtitle2">
                    This plan is not valid for Submarine.me
                  </Typography>
                </Unstable_Grid2>
              )}
            </Unstable_Grid2>
          </Unstable_Grid2>
          <Unstable_Grid2 sx={{ textAlign: "center" }}>
            {currentPlan?.type !== plan.type && nextPlan?.type !== plan.type && (
              <Button onClick={() => action(plan)} sx={{ marginTop: 2, width: "90%" }}>
                {hasCouponBanner ? "FREE 30 DAYS" : "Select Plan"}
              </Button>
            )}

            {currentPlan?.type === plan.type && (
              <Button
                disabled={currentPlan?.type === plan.type}
                sx={{
                  marginTop: 2,
                  width: "90%",
                  ":disabled": {
                    backgroundColor: "white",
                  },
                }}
              >
                Current Plan
              </Button>
            )}
            {nextPlan?.type === plan.type && currentPlan?.type !== plan.type && (
              <Button disabled={nextPlan?.type === plan.type} sx={{ marginTop: 2, width: "90%" }}>
                Your Next Plan
              </Button>
            )}
            {currentPlan?.type === plan.type && nextPlan && nextPlan.type !== plan.type && (
              <Unstable_Grid2 container sx={{ justifyContent: "center" }}>
                <Button
                  sx={{ backgroundColor: "white", color: "#2a40d7", marginTop: 2, width: "90%" }}
                  onClick={() => action(plan)}
                >
                  Keep Current Plan
                </Button>
                <Typography variant="caption" sx={{ marginTop: 2 }}>
                  Your plan will be downgraded
                </Typography>
              </Unstable_Grid2>
            )}
          </Unstable_Grid2>
        </Unstable_Grid2>
      </CardContent>
    </Card>
  );
};

export default CardPricing;
