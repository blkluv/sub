import { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Alert,
  CardContent,
  Card,
  Typography,
  Box,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { planTypes } from "../../constants/planTypes";
import { BillingState } from "../../store/legacy/billing/types";
import { UserState } from "../../store/legacy/user/types";

const currentPlanIconMap: { [key: string]: string } = {
  //  [planTypes.FREE.type]: "purplepinata",
  [planTypes.PICNIC.type]: "magentapinata",
  [planTypes.FIESTA.type]: "bluepinata",
  [planTypes.CARNIVAL.type]: "bluepinata",
  [planTypes.ENTERPRISE.type]: "purplepinata",
};

interface CurrentPlanInfoProps {
  metrics: any;
  lastUpdated: number;
  billing: BillingState;
  user: UserState;
}

const StripedTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "& td, & th": {
    border: 0,
  },
}));

function CurrentPlanInfo(props: CurrentPlanInfoProps) {
  const { metrics, lastUpdated, billing, user } = props;
  const [lastUpdatedSec, setLastUpdatedSec] = useState(0);

  const { activePricingPlan: currentPlan, nextPlan, nextBillingDate } = billing;

  const getPlanIcon = useMemo(() => {
    if (currentPlan?.isLegacy) {
      return "purplepinata";
    } else {
      return currentPlanIconMap[currentPlan?.type || planTypes.FREE.type];
    }
  }, [currentPlan]);

  const getMetricColorClass = (metricPercentage: number) => {
    if (metricPercentage >= 100) {
      return "metric-exceeded";
    } else if (metricPercentage >= 80) {
      return "metric-near";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdatedSec((prevSec) => prevSec + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLastUpdatedSec(0);
  }, [lastUpdated]);

  const renderMetricsList = useMemo(() => {
    return Object.keys(metrics?.metricsMonthly)
      .filter((metricKey) =>
        currentPlan?.isLegacy
          ? !(metricKey === "imageResizeRequests" || metricKey === "shortLinkCount")
          : true
      )
      .map((metricKey, index) => {
        const metric = metrics?.metricsMonthly[metricKey];
        let metricFormattedValue =
          !metric.value && currentPlan?.type === planTypes.FREE.type ? "-" : metric.value;
        if (metricKey === "transferBytes" && metric.value !== 0) {
          metricFormattedValue = prettySize(metric.value);
        }

        return (
          <StripedTableRow
            key={index}
            className={
              metricKey !== "gatewayCount" && !currentPlan?.isLegacy
                ? getMetricColorClass(metric.percentage)
                : ""
            }
          >
            <TableCell>{metric.title}</TableCell>
            <TableCell>
              {metricFormattedValue}
              {/* for legacy accounts show only values */}
              {!!metric.limit &&
                !currentPlan?.isLegacy &&
                `/ ${metric.limit} ${metric.limitUnit || ""}`}
            </TableCell>
            {!currentPlan?.isLegacy && <TableCell> {metric.percentage}% </TableCell>}
          </StripedTableRow>
        );
      });
  }, [metrics?.metricsMonthly]);

  const renderAccountMetricsList = useMemo(() => {
    return Object.keys(metrics?.metricsAccount).map((metricKey, index) => {
      const metric = metrics?.metricsAccount[metricKey];
      let metricFormattedValue =
        !metric.value && currentPlan?.type === planTypes.FREE.type ? "-" : metric.value;
      if (metricKey === "storageSize" && metric.value !== 0) {
        metricFormattedValue = prettySize(metric.value);
      }

      return (
        <StripedTableRow
          key={index}
          className={
            metricKey !== "gatewayCount" && !currentPlan?.isLegacy
              ? getMetricColorClass(metric.percentage)
              : ""
          }
        >
          <TableCell>{metric.title}</TableCell>
          {/* for legacy accounts show only values */}
          {currentPlan?.isLegacy ? (
            <TableCell>
              {metricFormattedValue}{" "}
              {currentPlan?.name === "FREE" && metricKey === "storageSize" && `/ 1 GB`}
            </TableCell>
          ) : (
            <>
              <TableCell>
                {metricFormattedValue}{" "}
                {!!metric.limit &&
                  !currentPlan?.isLegacy &&
                  `/ ${metric.limit} ${metric.limitUnit || ""}`}
              </TableCell>
              <TableCell> {metric.percentage}% </TableCell>
            </>
          )}
        </StripedTableRow>
      );
    });
  }, [metrics?.metricsAccount]);

  return (
    <Card>
      <CardContent>
        <Box>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div>
              <Typography variant="h6">
                Current Plan:{" "}
                {currentPlan?.isLegacy || currentPlan?.type === planTypes.ENTERPRISE.type
                  ? currentPlan?.name
                  : currentPlan?.nickname}
              </Typography>
              {nextPlan && nextBillingDate && !user.user?.scheduledToBeCancelledAt && (
                <>
                  <Typography variant="body1">{`Next Plan: ${
                    nextPlan.type === planTypes.ENTERPRISE.type
                      ? nextPlan?.name
                      : nextPlan?.nickname
                  }`}</Typography>
                  <Typography variant="body2">
                    Changes will be applied on {nextBillingDate}
                  </Typography>
                </>
              )}
              {user.user?.scheduledToBeCancelledAt && (
                <Typography variant="body1">
                  Your{" "}
                  {currentPlan?.type !== planTypes.ENTERPRISE.type
                    ? currentPlan?.nickname
                    : currentPlan?.name}{" "}
                  plan will be canceled on{" "}
                  <span>{dayjs(nextBillingDate).format("YYYY-MM-DD")}</span>
                </Typography>
              )}
            </div>
            <img
              className="pinata-current-plan-pinnie"
              // src={require(`../../assets/images/${getPlanIcon}.png`).default} TODO
              style={{
                position: "absolute",
                right: "10%",
                top: "10px",
              }}
              loading="lazy"
            />
          </div>
          {currentPlan?.isLegacy && (
            <p className="my-4 text-muted w-50 font-size-12">
              {currentPlan.name === "FREE"
                ? "Free for up to the first GB and $0.15/GB after that."
                : currentPlan.name === "INDIVIDUAL"
                ? "$0.15 per GB stored (1GB free)"
                : `${currentPlan.price} per month plus $0.15 per GB stored (${currentPlan?.storage_limit_gb}GB free) - Additional gateways are $10 per month each`}
            </p>
          )}
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border-0" sx={{ width: "50%" }}>
                Account Metrics
              </TableCell>
              <TableCell className="border-0">Total Usage</TableCell>
              {!currentPlan?.isLegacy && (
                <TableCell className="border-0">% of plan limit</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>{renderAccountMetricsList}</TableBody>
        </Table>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border-0" sx={{ width: "50%" }}>
                Monthly Metrics
              </TableCell>
              <TableCell className="border-0">Monthly Usage</TableCell>
              {!currentPlan?.isLegacy && (
                <TableCell className="border-0">% of plan limit</TableCell>
              )}
            </TableRow>
          </TableHead>
          <tbody>{renderMetricsList}</tbody>
        </Table>
        <Alert severity={"info"}>Metrics last updated: {lastUpdatedSec}s ago</Alert>
        <Alert severity={"warning"}>
          Some metrics might take a few minutes to be reflected here
        </Alert>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = ({ metrics, user }: any) => ({
  metrics: metrics?.metrics,
  lastUpdated: metrics?.lastUpdated,
  user: user,
});

export default connect(mapStateToProps, {})(CurrentPlanInfo);

const prettySize = (bytes: number, isDecimal = true, decimalPlaces = 2, includeUnits = true) => {
  const thresh = isDecimal ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }
  const units = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const numberOfDecimalPlaces = decimalPlaces ? decimalPlaces : 1;
  let u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return `${bytes.toFixed(numberOfDecimalPlaces)}${includeUnits ? " " + units[u] : ""}`;
};
