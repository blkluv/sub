import { Paper, Typography, Unstable_Grid2 } from "@mui/material";
import CustomizationForm from "../Customization/CustomizationForm";
import FileDetailForm from "./FileDetailForm";

const LockTypeContainer = ({ children, title, description }) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: "30px" }}>
      <Unstable_Grid2
        container
        direction={"column"}
        sx={{
          gap: ".5em",
          backgroundColor: (theme) => theme.palette.primary.light,
          padding: (theme) => theme.spacing(3),
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
        }}
      >
        <Typography variant="h2">{title}</Typography>
        <Typography variant="subtitle2" sx={{ color: "darkGrey" }} paragraph>
          {description}
        </Typography>
      </Unstable_Grid2>
      <Unstable_Grid2 container direction={"column"} sx={{ padding: (theme) => theme.spacing(3) }}>
        <FileDetailForm />
        {children}
        <CustomizationForm />
      </Unstable_Grid2>
    </Paper>
  );
};

export default LockTypeContainer;
