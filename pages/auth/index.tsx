import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectIsAuthenticated } from "../../store/selectors/authSelectors";
import { withRouter } from "next/router";
import { useEffect } from "react";
import SharedHead from "../../components/Layout/SharedHead";
import Navigation from "../../components/Navigation";
import AuthForm from "../../components/Auth/AuthForm";
import { refreshGatewayUrl, tryLogin } from "../../store/slices/authSlice";

const Login = ({ router }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  if (isAuthenticated) {
    if (router.query.from) {
      router.push(router.query.from);
    } else {
      router.push("/");
    }
  }
  useEffect(() => {
    isAuthenticated && dispatch(refreshGatewayUrl());
  }, [isAuthenticated]);

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
