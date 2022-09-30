import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors/authSelectors";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Alert from "../Alert";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      if (!isAuthenticated) {
        router.push({ pathname: "/auth", query: { from: router.asPath } });
      }
    }
  }, [isAuthenticated, router.isReady]);

  // TODO add loading spinner
  // TODO make Alert global, redux store.
  const layout = isAuthenticated ? (
    <>
      {/* <Alert /> */}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  ) : null;
  return layout;
};

export default Layout;
