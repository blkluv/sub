import Auth from "../../components/Auth";
import { useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors/authSelectors";
import { withRouter } from "next/router";

const Login = ({ router }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (isAuthenticated) {
    if (router.query.from) {
      router.push(router.query.from);
    } else {
      router.push("/");
    }
  }
  return <Auth />;
};

export default withRouter(Login);
