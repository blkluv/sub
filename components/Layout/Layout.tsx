import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors/authSelectors";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push({ pathname: "/auth", query: { from: router.pathname } });
    }
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
