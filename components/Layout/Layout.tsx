import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated, selectUser } from "../../store/selectors/authSelectors";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Alert from "../Alert";
import { useIntercom } from "react-use-intercom";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  const user = useAppSelector(selectUser);
  const { boot, shutdown, hide, show, update } = useIntercom();

  useEffect(() => {
    boot({
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
    });
  }, []);

  useEffect(() => {
    !isAuthenticated && shutdown();
  }, [isAuthenticated]);

  useEffect(() => {
    if (router.isReady) {
      if (!isAuthenticated) {
        router.push({ pathname: "/auth", query: { from: router.asPath } });
      }
    }
  }, [isAuthenticated, router.isReady]);

  // TODO add loading spinner
  const layout = isAuthenticated ? (
    <>
      <Alert />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  ) : null;
  return layout;
};

export default Layout;
