import * as React from "react";
import Pagination from "@mui/material/Pagination";

export default function AppPagination({ page, count, handleChange }) {
  return (
    <div>
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
}
