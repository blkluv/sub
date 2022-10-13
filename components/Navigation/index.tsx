/* This example requires Tailwind CSS v2.0+ */
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated, selectUserAvatar } from "../../store/selectors/authSelectors";
import { doLogOut } from "../../store/slices/authSlice";
import { MenuIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Navigation({ props }) {
  const avatarPath = useAppSelector(selectUserAvatar); // TODO - add avatar to user {isAuthenticated && <ProfileDropDown avatar={avatar} />}
  const isAuthenticated = !!useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(doLogOut());
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <AppBar component="nav" color="default">
      <Toolbar sx={{ marginLeft: "15%", marginRight: "15%" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Link passHref href="/">
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Image height={32} width={47} src="/submarine.png" alt="Submarine Me" />
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "inline", padding: (theme) => theme.spacing(3) }}
            >
              submarine.me
            </Typography>
          </Box>
        </Link>
        {isAuthenticated && (
          <Button color="primary" variant="outlined" onClick={handleLogOut} size="small">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
