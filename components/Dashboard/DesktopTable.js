import Image from "next/image";
import React from "react";
import { makeDatePretty } from "../../helpers/makePrettyDate";

const DesktopTable = ({ files, getThumbnail, copyLink, openDeleteModal }) => {
  return (
    <div className="px-4">
      <table className="hidden sm:table min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
            >
              Name
            </th>
            <th
              scope="col"
              className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
            >
              Content Identifier (CID)
            </th>
            <th
              scope="col"
              className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
            ></th>
            <th
              scope="col"
              className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {files.map((file) => (
            <tr key={file.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 sm:pl-6 md:pl-0">
                <span className="flex flex-row">
                  <Image layout="fixed" className="rounded-full border-2 border-gray-500" src={getThumbnail(file)} height={70} width={70} />
                  <span className="ml-4">
                    <span className="text-md font-medium text-gray-900">{file?.name}</span>
                    <br />
                    <span className="text-sm">
                      {file?.unlock_info?.type}
                      {file?.unlock_info?.type === "nft" &&
                        ` - ${file?.unlock_info?.blockchain}`}
                    </span> <br/>
                    <span className="text-muted text-sm">
                      {makeDatePretty(file.created_at)}
                    </span>
                  </span>
                </span>
                <br />
              </td>
              <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">
                {file?.submarine_cid}
              </td>
              {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <a
            className="text-indigo-600 hover:text-indigo-900"
            href={getLink(file)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.unlock_info?.type}
          </a>
        </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                <button onClick={() => copyLink(file)}>Copy Share Link</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => openDeleteModal(file)}
                  className="text-gray-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopTable;
