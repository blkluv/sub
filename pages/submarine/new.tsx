import React from "react";
import Layout from "../../components/Layout";
import SelectLockType from "../../components/Submarine/SelectLockType";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Box } from "@mui/material";

const SubmarineNew = () => {
  return (
    <Layout>
      <Link passHref href="/">
        <Box sx={{ height: "2rem", width: "2rem", cursor: "pointer", marginBottom: "1rem" }}>
          <ArrowLeftIcon />
        </Box>
      </Link>
      <SelectLockType />
    </Layout>
  );
};

export default SubmarineNew;
