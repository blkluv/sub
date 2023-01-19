import { Box, Unstable_Grid2 } from "@mui/material";
import Missing from "../components/Content/Missing";
import PublicLayout from "../components/Layout/PublicLayout";
import SubmarineLogoSvg from "../components/SubmarineLogoSvg";

const fourOfour = () => {
  return (
    <PublicLayout>
      <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex" }}>
        <>
          <Box
            sx={{
              position: "absolute",
              padding: (theme) => theme.spacing(2, 4),
              width: "fit-content",
            }}
          >
            <SubmarineLogoSvg />
          </Box>
          <Unstable_Grid2
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              background: "linear-gradient(161.52deg, #FF6B00 7.31%, #0038FF 98.65%)",
              width: "100%",
              justifyContent: "center",
              borderRadius: 0,
            }}
          >
            <Missing />
          </Unstable_Grid2>
        </>
      </Box>
    </PublicLayout>
  );
};

export default fourOfour;
