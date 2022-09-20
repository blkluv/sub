import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { tryLogIn } from "../../store/slices/authSlice";
import Nav from "../Navigation";
import AuthForm from "./AuthForm";

const Auth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(tryLogIn());
  }, []);
  return (
    <div>
      <Nav />
      <AuthForm />
    </div>
  );
};

export default Auth;
