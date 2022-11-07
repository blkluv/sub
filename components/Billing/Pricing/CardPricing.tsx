import styled from "@emotion/styled";
import { Button, Card, CardContent, ListItem, Tooltip, Typography } from "@mui/material";
import { BillingPlan, Plan } from "../../../store/legacy/billing/types";

interface CardPricingProps {
  plan: BillingPlan;
  action: any;
  currentPlan: Plan | null;
  nextPlan: Plan | null;
  disabled: boolean;
}

const CardPricing = ({ plan, action, currentPlan, nextPlan, disabled }: CardPricingProps) => {
  const SelectedPlanCard =
    currentPlan?.type === plan.type
      ? styled(Card)`
          border: 6px solid;
          border-image-slice: 1;
          border-image-source: linear-gradient(120deg, var(--purple), orange);
        `
      : Card;
  return (
    <ListItem>
      <SelectedPlanCard
        sx={{ height: "100%", width: "100%", backgroundColor: disabled ? "#eeeeee" : "white" }}
      >
        <CardContent sx={{ height: "100%" }}>
          <div className="d-flex h-100 flex-column align-items-center justify-content-between">
            <div className="text-center">
              <Typography variant="h4">{plan.nickname}</Typography>
              <Typography variant="caption">{plan.subtitle}</Typography>
              <p className="d-flex flex-column text-muted text-weight-700 text-center mh-25">
                <span style={{ fontSize: "4em" }}>${plan.price}</span>
                <span style={{ fontSize: "1em" }}>/month</span>
              </p>
              <div className="d-flex flex-column align-items-center">
                <ul className="font-size-16 list-unstyled text-left">
                  {plan?.features?.length > 0 &&
                    plan.features.map((feature, index) => {
                      return (
                        <li key={`feature_${index}`} className="mb-1">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-check mr-3 text-primary align-self-baseline mt-1" />
                            <span>{feature}</span>
                          </div>
                        </li>
                      );
                    })}
                  {disabled && (
                    <li style={{ marginTop: "3rem" }}>
                      <div className="text-center">
                        <i className="fas fa-check mr-3 text-primary " />
                        <span>
                          <br />
                          <strong>This plan is not valid for Submarine.me</strong>
                        </span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {currentPlan?.type !== plan.type && nextPlan?.type !== plan.type && (
              <Button onClick={() => action(plan)} size="large" sx={{ marginTop: 2 }}>
                Select {plan.nickname}
              </Button>
            )}
            {/* do not allow user click one more time to the already chosen plan */}
            {nextPlan?.type === plan.type && currentPlan?.type !== plan.type && (
              <Button disabled={nextPlan?.type === plan.type} size="large" sx={{ marginTop: 2 }}>
                Your Next Plan
              </Button>
            )}
            {currentPlan?.type === plan.type && nextPlan && nextPlan.type !== plan.type && (
              <>
                <Typography variant="caption" sx={{ marginTop: 2 }}>
                  Your plan will be downgraded
                </Typography>
                <Button size="large" onClick={() => action(plan)}>
                  Keep my current plan
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </SelectedPlanCard>
    </ListItem>
  );
};

export default CardPricing;
