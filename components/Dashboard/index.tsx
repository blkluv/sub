import React, { useEffect, useState } from "react";
import LinkTable from "./LinkTable";
import Link from "next/link";
import UpgradeModal from "./UpgradeModal";
import AppPagination from "./AppPagination";

import Loading from "./Loading";
import placeholder from "../../public/submarine.png";
import { getKy } from "../../helpers/ky";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";
import { setAlert } from "../../store/slices/alertSlice";
import { Button, Divider, Menu, MenuItem, Typography, Unstable_Grid2 } from "@mui/material";
import SubmarineDialog from "../Submarine/SubmarineDialog/SubmarineDialog";

const NEW_PLANS = ["Picnic", "Fiesta", "Carnival", "Enterprise"];

const LIMIT = 5;

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const gatewayUrl = useAppSelector(selectGatewayUrl);
  const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const selectMenuOpen = Boolean(anchorEl);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    loadLinks();
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
      loadLinks();
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

  const handleChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const offset = value * LIMIT - LIMIT;
    const fileRange = data.slice(offset, offset + LIMIT);
    setFiles(fileRange);
  };

  const loadLinks = async () => {
    const ky = getKy();
    const res = await ky.get(`/api/metadata`);
    const json = await res.json();
    if (json && json.length > 0) {
      setCount(Math.ceil(json.length / LIMIT));
      setFiles(json.slice(0, LIMIT));
      setData(json);
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
        json: { id },
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

  const handleSubmarineClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      setAnchorEl(event.currentTarget);
    } else {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <SubmarineDialog setOpen={setDialogOpen} open={dialogOpen} />
      <Unstable_Grid2 container direction={"column"} sx={{ marginTop: "3em" }}>
        <Unstable_Grid2
          container
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
        >
          <Unstable_Grid2 container direction={"column"}>
            <Typography variant="h1">Submarined Files</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: (theme) => theme.palette.grey[700],
                fontWeight: 300,
                marginTop: "0.5em",
              }}
            >
              Find your recently submarined content below
            </Typography>
          </Unstable_Grid2>
          <Button
            sx={{
              "&:hover": { backgroundColor: (theme) => theme.palette.primary.main },
              marginTop: "1em",
            }}
            onClick={(e) => handleSubmarineClick(e)}
          >
            Submarine New Files
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={selectMenuOpen}
            onClose={(e) => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link href={"/submarine/nft"} passHref>
              <MenuItem onClick={(e) => setAnchorEl(null)}>NFT Ownership</MenuItem>
            </Link>
            <Link href={"/submarine/retweet"} passHref>
              <MenuItem onClick={(e) => setAnchorEl(null)}>Retweet</MenuItem>
            </Link>
            <Link href={"/submarine/location"} passHref>
              <MenuItem onClick={(e) => setAnchorEl(null)}>Location</MenuItem>
            </Link>
            <MenuItem disabled={true} onClick={(e) => setAnchorEl(null)}>
              Credit/Debit Card (coming soon)
            </MenuItem>
          </Menu>
        </Unstable_Grid2>
        <Divider sx={{ width: "100%", margin: (theme) => theme.spacing(4, 0, 0, 0) }} />

        {loading ? (
          <Loading />
        ) : (
          <>
            <Unstable_Grid2 container direction={"column"} gap={3}>
              <LinkTable
                copyLink={copyLink}
                files={files}
                handleDelete={handleDelete}
                open={open}
                setOpen={setOpen}
                loadLinks={loadLinks}
                getThumbnail={getThumbnail}
              />
              {data && data.length > 0 && (
                <Unstable_Grid2 sx={{ margin: "auto" }}>
                  <AppPagination page={page} count={count} handleChange={handleChangePage} />
                </Unstable_Grid2>
              )}
            </Unstable_Grid2>
          </>
        )}
      </Unstable_Grid2>
      {displayUpgradeModal && <UpgradeModal />}
    </>
  );
};

export default Dashboard;
