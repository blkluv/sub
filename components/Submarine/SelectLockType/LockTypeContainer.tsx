import { Paper, Typography, Unstable_Grid2 } from "@mui/material";
import FileDetail from "./FileDetail";

const LockTypeContainer = ({ children, title, description }) => {
  return (
    <Paper sx={{ padding: (theme) => theme.spacing(2) }} elevation={3}>
      <Unstable_Grid2 container direction={"column"}>
        <Typography variant="h5">{title}</Typography>
        <Typography paragraph>{description}</Typography>
        {children}
        <FileDetail />
      </Unstable_Grid2>
    </Paper>
  );
};

export default LockTypeContainer;
