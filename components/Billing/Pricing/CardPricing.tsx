import styled from "@emotion/styled";
import { Button, Card, CardContent, Typography, Unstable_Grid2 } from "@mui/material";
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

const CardPricing = ({ plan, action, currentPlan, nextPlan, disabled }: CardPricingProps) => {
  return (
    <Card
      sx={{
        padding: "4rem .5rem",
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
        <Unstable_Grid2 container flexDirection={"column"} gap={"1rem"}>
          <Unstable_Grid2>
            <Unstable_Grid2>
              <Image height={32} width={32} src="/pinniedark.png" alt="Pinata logo" />
              {plan.type !== 0 && (
                <Image height={32} width={46} src="/submarine.png" alt="Submarine.me logo" />
              )}
            </Unstable_Grid2>
            <Typography variant="h4">{plan.nickname}</Typography>
            <Typography variant="subtitle2">{plan.subtitle}</Typography>
          </Unstable_Grid2>
          <Unstable_Grid2>
            <Typography variant="h2">{plan.type == 0 ? "Free" : "$" + plan.price}</Typography>
            <Typography variant="subtitle2">
              {plan.type == 0 ? "For a lifetime" : "/month"}{" "}
            </Typography>
            <Unstable_Grid2 sx={{ textAlign: "center" }}>
              {currentPlan?.type !== plan.type && nextPlan?.type !== plan.type && (
                <Button onClick={() => action(plan)} sx={{ marginTop: 2, width: "90%" }}>
                  Select Plan
                </Button>
              )}
              {currentPlan?.type === plan.type && (
                <Button
                  sx={{ backgroundColor: "white", color: "#2a40d7", marginTop: 2, width: "90%" }}
                >
                  Current Plan
                </Button>
              )}
            </Unstable_Grid2>
          </Unstable_Grid2>
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
            {/* {disabled && (
                <Unstable_Grid2 sx={{ marginTop: "2rem" }}>
                  <Typography variant="subtitle2">
                    This plan is not valid for Submarine.me
                  </Typography>
                </Unstable_Grid2>
              )} */}
            {/* do not allow user click one more time to the already chosen plan */}
            {nextPlan?.type === plan.type && currentPlan?.type !== plan.type && (
              <Button disabled={nextPlan?.type === plan.type} size="large" sx={{ marginTop: 2 }}>
                Your Next Plan
              </Button>
            )}
            {currentPlan?.type === plan.type && nextPlan && nextPlan.type !== plan.type && (
              <Unstable_Grid2>
                <Typography variant="caption" sx={{ marginTop: 2 }}>
                  Your plan will be downgraded
                </Typography>
                <Button size="large" onClick={() => action(plan)}>
                  Keep my current plan
                </Button>
              </Unstable_Grid2>
            )}
          </Unstable_Grid2>
        </Unstable_Grid2>
      </CardContent>
    </Card>
  );
};

export default CardPricing;
