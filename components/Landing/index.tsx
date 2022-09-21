import React from "react";
import Navigation from "../Navigation";
import Footer from "./Footer";
import ForCreatives from "./ForCreatives";
import GetStarted from "./GetStarted";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import WhatIs from "./WhatIs";

const Landing = () => {
  return (
    <div className="landing-bg min-h-full">
      <Navigation />
      <Hero />
      <WhatIs />
      <HowItWorks />
      <ForCreatives />
      <GetStarted />
      <Footer />
    </div>
  );
};

export default Landing;
