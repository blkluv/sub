import React from "react";
import Pinnie from "../Pinnie";
import SubmarineLogoSvg from "../SubmarineLogoSvg";
import Image from "next/image";

const Missing = () => {
  return (
    <div>
      <div className="absolute p-4 flex flex-row">
        <div>
          <SubmarineLogoSvg />
        </div>
      </div>
      <div className="absolute bottom-10 right-10 z-10">
        <Pinnie />
      </div>
      <div className="public-content-bg h-screen w-screen flex flex-col justify-center align-center">
        <div className="p-10 md:w-1/2 w-3/4 h-auto text-center flex flex-col justify-center align-center m-auto bg-white overflow-hidden shadow-lg rounded-lg">
          <div>
            <Image
              alt="Submarine Logo"
              height={135}
              width={200}
              src="/submarine.png"
              className="z-100"
            />
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">This submarine got lost at sea</span>
            </h2>
            <h4 className="mt-4 text-muted text-xl">
              We could not find the requested Submarined file.
            </h4>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex w-1/2"></div>
            </div>
            <p className="mt-4 mb-4 text-md text-muted"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missing;
