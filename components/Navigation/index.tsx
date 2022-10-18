/* This example requires Tailwind CSS v2.0+ */
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated, selectUserAvatar } from "../../store/selectors/authSelectors";
import { doLogOut } from "../../store/slices/authSlice";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Navigation() {
  const avatarPath = useAppSelector(selectUserAvatar); // TODO - add avatar to user {isAuthenticated && <ProfileDropDown avatar={avatar} />}
  const isAuthenticated = !!useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(doLogOut());
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar position="sticky" component="nav" color="default">
      <Toolbar>
        <Container maxWidth={"lg"}>
          <Unstable_Grid2 container alignItems="center" justifyContent="space-between">
            <Link passHref href="/">
              <Box>
                <Image height={32} width={47} src="/submarine.png" alt="Submarine Me" />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    display: isMobile ? "none" : "inline",
                    padding: (theme) => theme.spacing(3),
                  }}
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
          </Unstable_Grid2>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
