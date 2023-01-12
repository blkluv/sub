import Image from "next/image";
import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Container } from "@mui/system";

const Missing = () => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          height: "auto",
          alignSelf: "center",
          padding: (theme) => theme.spacing(4),
          margin: (theme) => theme.spacing(4),
          backgroundColor: "white",
          boxShadow: (theme) => theme.shadows![5],
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      >
        <Grid>
          <Image alt="Submarine Logo" height={135} width={200} src="/submarine.png" />
          <Typography variant="h1" fontWeight={"bold"} fontSize={40}>
            This submarine got lost at sea
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "1rem" }}>
            We could not find the requested Submarined file.
          </Typography>
        </Grid>
      </Container>
    </>
  );
};

export default Missing;
