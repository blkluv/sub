import { Button, Unstable_Grid2, Pagination, Box } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Download } from "@mui/icons-material";

const DownloadFile = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  const handleChange = (event, value) => {
    setPageNumber(value);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <Unstable_Grid2
      container
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      gap={"1em"}
    >
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
      </Document>
      <Pagination size="small" count={numPages} page={pageNumber} onChange={handleChange} />
      <Button
        href={url}
        variant="outlined"
        sx={{
          backgroundColor: "white",
          borderColor: "black",
          color: "black",
          marginTop: "1rem",
        }}
      >
        <Download />
        Download
      </Button>
    </Unstable_Grid2>
  );
};
export default DownloadFile;
