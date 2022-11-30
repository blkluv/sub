import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import SharedHead from "../../components/Layout/SharedHead";
import Navigation from "../../components/Navigation";

const Signup = () => {
  return (
    <>
      <SharedHead />
      <Navigation />
      <ForgotPasswordForm />
    </>
  );
};

export default Signup;