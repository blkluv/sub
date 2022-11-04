import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors/authSelectors";
import { withRouter } from "next/router";
import { useEffect } from "react";
import SharedHead from "../../components/Layout/SharedHead";
import Navigation from "../../components/Navigation";
import AuthForm from "../../components/Auth/AuthForm";
import { tryLogin } from "../../store/slices/authSlice";

const Login = ({ router }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (isAuthenticated) {
    if (router.query.from) {
      router.push(router.query.from);
    } else {
      router.push("/");
    }
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(tryLogin());
  }, []);

  return (
    <>
      <SharedHead />
      <Navigation />
      <AuthForm />
    </>
  );
};

export default withRouter(Login);
