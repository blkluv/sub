import React, { useEffect } from "react";
import MainLandingContent from "./MainLandingContent";

const Ethereum = ({
  signing,
  loading,
  handleSign,
  fileInfo,
  gallery,
  fullResponse,
  handleChangePage,
}) => {
  return (
    <div>
      <MainLandingContent
        handleChangePage={handleChangePage}
        fullResponse={fullResponse}
        gallery={gallery}
        fileInfo={fileInfo}
        loading={loading}
        signing={signing}
        handleSign={handleSign}
      />
    </div>
  );
};

export default Ethereum;
