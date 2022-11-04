import { AppBar, Box, Container, Toolbar, Unstable_Grid2 } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated, selectUserAvatar } from "../../store/selectors/authSelectors";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import AvatarMenu from "./AvatarMenu";

export default function Navigation() {
  const avatarPath = useAppSelector(selectUserAvatar); // TODO - add avatar to user {isAuthenticated && <ProfileDropDown avatar={avatar} />}
  const isAuthenticated = !!useAppSelector(selectIsAuthenticated);
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      component="nav"
      sx={{
        background:
          "linear-gradient(0deg, rgba(249, 249, 249, 0.94), rgba(249, 249, 249, 0.94)), rgba(30, 30, 30, 0.75)",
        backdropFilter: "blur(10px)",
        height: "6em",
        width: "100vw",
        justifyContent: "center",
      }}
    >
      <Toolbar>
        <Container maxWidth={"lg"}>
          <Unstable_Grid2
            container
            alignItems="center"
            alignContent={"center"}
            justifyContent="space-between"
          >
            <Link passHref href="/">
              <Box sx={{ cursor: "pointer" }}>
                <Image height={32} width={47} src="/submarine.png" alt="Submarine Me" />
              </Box>
            </Link>
            {isAuthenticated && <AvatarMenu avatarPath={avatarPath} />}
          </Unstable_Grid2>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
