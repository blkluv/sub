import React from "react";

const Hero = () => {
  return (
    <div className="h-screen w-screen hero-content-bg">
      <div className="container w-3/5 m-auto py-36">
        <img className="md:absolute" src="/Introducing.svg" alt="Introducing" />
        <img
          className="md:absolute md:right-16 md:mt-56 md:right-44"
          src="/SubmarineText.svg"
          alt="Submarine"
        />
        <div className="absolute md:right-48 w-48 md:mt-56">
          <img src="/PurpleSub.svg" alt="purple submarine" />
          <p className="font-bold mt-4">
            The easiest way to share exclusive content with your frens
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
