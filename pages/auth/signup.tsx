import SignUpForm from "../../components/Auth/SignUpForm";
import SharedHead from "../../components/Layout/SharedHead";
import Navigation from "../../components/Navigation";

const Signup = () => {
  return (
    <>
      <SharedHead />
      <Navigation />
      <SignUpForm />
    </>
  );
};

export default Signup;
