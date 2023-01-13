import { Button, Unstable_Grid2, Dialog, Box } from "@mui/material";
import { pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Download } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PDF from "./PDF";
import CircularProgress from "@mui/material/CircularProgress";
import { Document, Page } from "react-pdf";

const PDFViewer = ({ url }: { url: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  return (
    <Unstable_Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      gap={"1em"}
    >
      <Dialog
        PaperProps={{
          style: {
            padding: "2em",
            alignItems: "center",
          },
        }}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="Dialog-Dialog-title"
        aria-describedby="Dialog-Dialog-description"
      >
        <PDF url={url} />
      </Dialog>
      <Unstable_Grid2>
        <Document
          file={url}
          loading={
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          }
        >
          <Page height={isMobile ? 300 : 500} pageNumber={1} renderAnnotationLayer={false}></Page>
        </Document>
      </Unstable_Grid2>
      <Unstable_Grid2 container sx={{ justifyContent: "center", alignItems: "center", gap: "1em" }}>
        <Button sx={{ width: "10em" }} onClick={handleOpen}>
          Preview PDF
        </Button>
        <Button
          href={url}
          sx={{
            width: "10em",
            backgroundColor: "white",
            borderColor: "black",
            color: "black",
          }}
        >
          <Download />
          Download
        </Button>
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
};
export default PDFViewer;
