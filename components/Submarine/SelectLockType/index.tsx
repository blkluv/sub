import {
  BadgeCheckIcon,
  CashIcon,
  LockClosedIcon,
  MapIcon,
  RefreshIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { Box, IconButton, Typography, Unstable_Grid2 } from "@mui/material";
import Link from "next/link";

const actions = [
  {
    title: "NFT Ownership",
    href: "#",
    id: "nft",
    Icon: ShoppingBagIcon,
    iconForeground: "text-pinata-purple",
    iconBackground: "bg-grey-50",
    link: "/submarine/nft",
    text: "Require ownership of a particular NFT to unlock your submarined content.",
  },
  {
    title: "Retweet",
    href: "#",
    id: "retweet",
    Icon: RefreshIcon,
    iconForeground: "text-pinata-purple",
    iconBackground: "bg-grey-50",
    link: "/submarine/retweet",
    text: "Require a retweet of a specific tweet in order to unlock your submarined content.",
  },
  {
    title: "Location",
    href: "#",
    id: "location",
    Icon: MapIcon,
    iconForeground: "text-pinata-purple",
    iconBackground: "bg-grey-50",
    link: "/submarine/location",
    text: "Require a someone to verify their current location to unlock your submarined content.",
  },
  {
    title: "Credit/Debit Card Payment",
    href: "#",
    id: "payment",
    Icon: CashIcon,
    iconForeground: "text-pinata-purple",
    iconBackground: "bg-grey-50",
    link: "/submarine/card",
    text: "Require a payment to unlock your submarined content",
    soon: true,
  },
];

export default function SelectLockType() {
  return (
    <>
      <Typography variant={"h4"}>
        {"Choose how you'd like your submarined content to be unlocked"}
      </Typography>

      <Box
        sx={{
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Unstable_Grid2 container>
          {actions.map((action) => (
            <Unstable_Grid2 xs={12} lg={6} key={action.title}>
              <Box
                sx={{
                  border: "0.5px solid",
                  borderColor: "grey.200",
                  height: "100%",
                  width: "100%",
                }}
              >
                <Link
                  id={action.id}
                  passHref
                  key={action.title}
                  href={action.soon ? "/submarine/new" : action.link}
                >
                  <Box
                    sx={{
                      position: "relative",
                      padding: "1.5rem",
                      cursor: "pointer",
                    }}
                  >
                    <IconButton color="primary">
                      <action.Icon
                        style={{
                          height: "1.5rem",
                          width: "1.5rem",
                        }}
                        aria-hidden="true"
                      />
                    </IconButton>
                    <Box sx={{ marginTop: "2rem" }}>
                      <Typography variant={"h6"}>
                        {action.title} {action.soon && "(Soon)"}
                      </Typography>
                      <Typography variant={"body2"}>{action.text}</Typography>
                    </Box>
                    <Box
                      component={"span"}
                      sx={{
                        top: "1.5rem",
                        right: "1.5rem",
                        position: "absolute",
                        pointerEvents: "none",
                        color: "rgba(0, 0, 0, 0.15)",
                        "&:hover": {
                          borderColor: "rgba(0, 0, 0, 0.25)",
                        },
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        style={{
                          height: "1.5rem",
                          width: "1.5rem",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </Box>
                  </Box>
                </Link>
              </Box>
            </Unstable_Grid2>
          ))}
        </Unstable_Grid2>
      </Box>
    </>
  );
}
