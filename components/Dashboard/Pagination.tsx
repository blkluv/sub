import { Button, Unstable_Grid2 } from "@mui/material";

export default function Pagination({ handlePageChange }) {
  return (
    <Unstable_Grid2 container justifyContent="flex-end" spacing={0}>
      <Button variant="outlined" onClick={() => handlePageChange("back")}>
        Previous
      </Button>
      <Button variant="outlined" onClick={() => handlePageChange("forward")}>
        Next
      </Button>
    </Unstable_Grid2>
  );
}
