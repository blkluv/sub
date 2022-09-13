import React, { useState } from "react";
import { makeDatePretty } from "../../helpers/makePrettyDate";
import DeleteModal from "./DeleteModal";
import DesktopTable from "./DesktopTable";
import MobileTable from "./MobileTable";

const LinkTable = ({ files, copyLink, setOpen, open, handleDelete, loadLinks, getThumbnail }) => {
  const [file, setFile] = useState(null);

  const openDeleteModal = (thisFile) => {
    setFile(thisFile);
    setOpen(true);
  };

  const getLink = (file) => {
    if (file?.metadata?.keyvalues?.unlockType === "retweet") {
      return file.metadata.keyvalues.tweetUrl;
    }
  };

  return (
    <div>
      <DesktopTable
        files={files}
        copyLink={copyLink}
        getThumbnail={getThumbnail}
        openDeleteModal={openDeleteModal}
      />
      <MobileTable
        files={files}
        copyLink={copyLink}
        openDeleteModal={openDeleteModal}
        getThumbnail={getThumbnail}
      />

      <DeleteModal
        file={file}
        handleDelete={handleDelete}
        open={open}
        setOpen={setOpen}
        loadLinks={loadLinks}
      />
    </div>
  );
};

export default LinkTable;
