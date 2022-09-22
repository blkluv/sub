import React from "react";
import Layout from "../../components/Layout";
import SelectLockType from "../../components/Submarine/SelectLockType";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const SubmarineNew = () => {
  return (
    <Layout>
      <div className="w-4/5 m-auto mt-10 mb-12">
        <Link passHref href="/">
          <div className="h-8 w-8 cursor-pointer mb-8">
            <ArrowLeftIcon />
          </div>
        </Link>
        <SelectLockType />
      </div>
    </Layout>
  );
};

export default SubmarineNew;
