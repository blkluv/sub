import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import SharedHead from "../../components/Layout/SharedHead";
import Navigation from "../../components/Navigation";

const ForgotPassword = () => {
  return (
    <>
      <SharedHead />
      <Navigation />
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;
