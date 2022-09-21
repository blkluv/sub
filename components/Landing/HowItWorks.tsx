import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="w-full text-center py-16">
      <div>
        <h1 className="text-3xl font-bold">How it works</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 container m-auto text-center">
        <div>
          <div className="">
            <Image
              className="h-64 w-auto m-auto"
              src="/Step1.png"
              alt="Step one: Choose how you'd like your content unlocked"
            />
          </div>
          <p className="text-xl font-bold mt-4 mb-2">Step 1</p>
          <p>{"Choose how you'd like your content unlocked"}</p>
        </div>
        <div>
          <div>
            <Image
              className="h-64 w-auto m-auto"
              src="/StepOne.png"
              alt="Step two: Add info about the content and upload the submarined file"
            />
          </div>
          <p className="text-xl font-bold mt-4 mb-2">Step 2</p>
          <p>Add info about the content and upload the submarined file</p>
        </div>
        <div>
          <div>
            <Image
              className="h-64 w-auto m-auto"
              src="/StepThree.png"
              alt="Step three: share the custom link"
            />
          </div>
          <p className="text-xl font-bold mt-4 mb-2">Step 3</p>
          <p>Share the custom link</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
