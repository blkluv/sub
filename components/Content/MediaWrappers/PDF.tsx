import { Pagination, Box } from "@mui/material";
import { Document, Page } from "react-pdf";
import { useState } from "react";
import { LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";

const PDF = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const handleChange = (event, value) => {
    setPageNumber(value);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <Pagination size="small" count={numPages} page={pageNumber} onChange={handleChange} />
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess} loading={<LinearProgress />}>
        <Page
          loading={
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          }
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          width={isMobile ? 300 : 900}
        ></Page>
      </Document>
    </>
  );
};

export default PDF;
