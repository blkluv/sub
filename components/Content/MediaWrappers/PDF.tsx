import { Pagination } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import { LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
          loading={<LinearProgress />}
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          width={isMobile ? 300 : 900}
        ></Page>
      </Document>
    </>
  );
};

export default PDF;
