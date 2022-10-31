import { Button, Unstable_Grid2 } from "@mui/material";

export default function Pagination({ handlePageChange }) {
  return (
    <Unstable_Grid2
      container
      justifyContent="flex-end"
      spacing={0}
      gap={".5rem"}
      paddingTop={"1rem"}
    >
      <Button
        sx={{ borderRadius: "10px" }}
        variant="outlined"
        onClick={() => handlePageChange("back")}
      >
        Previous
      </Button>
      <Button
        sx={{ borderRadius: "10px" }}
        variant="outlined"
        onClick={() => handlePageChange("forward")}
      >
        Next
      </Button>
    </Unstable_Grid2>
  );
}
