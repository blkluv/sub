import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors/authSelectors";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push({ pathname: "/auth", query: { from: router.pathname } });
    }
  }, [isAuthenticated]);

  // TODO add loading spinner
  const layout = isAuthenticated ? (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  ) : null;
  return layout;
};

export default Layout;
