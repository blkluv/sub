import Dashboard from "../components/Dashboard";
import Auth from "../components/Auth";
import SharedHead from "../components/SharedHead";
import { useAppSelector } from "../store/hooks";
import { selectIsAuthenticated } from "../store/selectors/authSelectors";

export default function Home() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  console.log({ isAuthenticated });
  return (
    <>
      <SharedHead />
      {isAuthenticated ? <Dashboard /> : <Auth />}
    </>
  );
}
