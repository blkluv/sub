import React, { useEffect, useState } from "react";
import LinkTable from "./LinkTable";
import Link from "next/link";
import UpgradeModal from "./UpgradeModal";
import Pagination from "./Pagination";
import Loading from "./Loading";
import placeholder from "../../public/submarine.png";
import { getKy } from "../../helpers/ky";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";
import { setAlert } from "../../store/slices/alertSlice";
import { Button, Divider, Typography, Unstable_Grid2 } from "@mui/material";
import SubmarineModal from "../SubmarineModal/SubmarineModal";
const NEW_PLANS = ["Picnic", "Fiesta", "Carnival", "Enterprise"];

const LIMIT = 5;

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [submarineOpen, setSubmarineOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  useEffect(() => {
    checkForPlan();
  }, []);

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

  const checkForPlan = async () => {
    const userPlanInfo = await getUserBillingInfo();
    if (!userPlanInfo) {
      setLoading(false);
      setDisplayUpgradeModal(true);
    } else if (!isValidPaidPlan(userPlanInfo)) {
      setLoading(false);
      setDisplayUpgradeModal(true);
    } else {
      loadLinks(offset);
    }
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

  const handleChangePage = async (direction) => {
    let newOffset = offset;

    if (direction === "forward") {
      newOffset = offset + LIMIT;
    } else {
      if (offset > 0) {
        newOffset = offset - LIMIT;
      }
    }
    setLoading(true);
    const json = await loadLinks(newOffset);
    if (json && json.length > 0) {
      setOffset(newOffset);
    }
    setLoading(false);
  };

  const loadLinks = async (newOffset) => {
    const ky = getKy();
    const res = await ky.get(`/api/metadata?offset=${newOffset}`);

    const json = await res.json();
    if (json && json.length > 0) {
      setFiles(json);
    }

    setLoading(false);
    return json;
  };
  const dispatch = useAppDispatch();
  const copyLink = (file) => {
    navigator.clipboard.writeText(`${window.location.origin}/${file.short_id}`);
    dispatch(
      setAlert({
        type: "success",
        message: "Share link copied!",
      })
    );
  };

  const handleDelete = async (id) => {
    try {
      const ky = getKy();
      await ky(`/api/metadata`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        timeout: 2147483647,
      });
    } catch (error) {
      dispatch(setAlert({ type: "error", message: "Error deleting link" }));
    }
  };

  const getThumbnail = (file) => {
    if (file.thumbnail) {
      return `${gatewayUrl}/ipfs/${file.thumbnail}`;
    } else {
      return placeholder;
    }
  };

  return (
    <>
      <SubmarineModal setOpen={setSubmarineOpen} open={submarineOpen} />
      <Unstable_Grid2 container direction={"column"} sx={{ marginTop: "3em" }}>
        <Unstable_Grid2
          container
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
        >
          <Unstable_Grid2 container direction={"column"}>
            <Typography variant="h1">Submarine Files</Typography>
            <Typography variant="subtitle2" sx={{ color: (theme) => theme.palette.grey[500] }}>
              Find your recently submarined content below{" "}
            </Typography>
          </Unstable_Grid2>
          <Button onClick={() => setSubmarineOpen(true)}>Submarine New Files</Button>
        </Unstable_Grid2>
        <Divider sx={{ width: "100%", margin: (theme) => theme.spacing(7, 0, 0, 0) }} />

        {loading ? (
          <Unstable_Grid2 container justifyContent={"center"}>
            <Loading />
          </Unstable_Grid2>
        ) : (
          <>
            <LinkTable
              copyLink={copyLink}
              files={files}
              handleDelete={handleDelete}
              open={open}
              setOpen={setOpen}
              loadLinks={loadLinks}
              getThumbnail={getThumbnail}
            />
            <Pagination handlePageChange={handleChangePage} />
          </>
        )}
      </Unstable_Grid2>
      {displayUpgradeModal && <UpgradeModal />}
    </>
  );
};

export default Dashboard;
