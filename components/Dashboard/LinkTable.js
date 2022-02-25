import React, { useState } from "react";
import { makeDatePretty } from "../../helpers/makePrettyDate";
import DeleteModal from "./DeleteModal";

const LinkTable = ({ files, copyLink, setOpen, open, handleDelete, loadLinks }) => {
  const [file, setFile] = useState(null);

  const openDeleteModal = (thisFile) => {
    setFile(thisFile);
    setOpen(true);
  }

  const getLink = (file) => {
    if (file?.metadata?.keyvalues?.unlockType === "retweet") {
      return file.metadata.keyvalues.tweetUrl;
    } 
  };
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
          <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              CID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Lock Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <span className="sr-only">Share</span>
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.map((file) => (
            <tr key={file.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {file?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {file?.submarine_cid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a
                  className="text-indigo-600 hover:text-indigo-900"
                  href={getLink(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.unlock_info?.type}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {makeDatePretty(file.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button onClick={() => copyLink(file)}>
                  Copy Share Link
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => openDeleteModal(file)} className="text-indigo-600 hover:text-indigo-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal file={file} handleDelete={handleDelete} open={open} setOpen={setOpen} loadLinks={loadLinks} />
    </div>
  );
};

export default LinkTable;
