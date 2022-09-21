import React from "react";
import Link from "next/link";
import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="w-full text-center py-16 container">
      <div className="w-3/4 m-auto md:flex md:flex-row">
        <Image src="/computer_screen.svg" alt="animated computer screen" />
        <div className="md:absolute md:w-1/4 w-full md:right-16 md:mt-44 special-background py-10 px-6 text-left">
          <h1 className="font-bold text-2xl">{"That's it!"}</h1>
          <p className="text-md font-light mt-6">
            Submarine.me is a premium feature available for all Pinata Pro Plan customers.
          </p>
          <Link
            href="/auth"
            className="mt-6 inline-flex items-center px-6 py-2 border border-transparent font-light rounded-full shadow-sm text-white bg-pinata-purple hover:bg-pinata-purple outline-none"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
