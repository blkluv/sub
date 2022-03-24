import { ShareIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react'
import { makeDatePretty } from '../../helpers/makePrettyDate';
import Image from "next/image";

const MobileTable = ({ files, copyLink, openDeleteModal }) => {
  const getThumbnail = (file) => {
    if (file.thumbnail) {
      return `https://opengateway.mypinata.cloud/ipfs/${file.thumbnail}?img-width=100&img-height=100`;
    } else {
      return "./camera.png";
    }
  };


  return (
    <tbody className="sm:hidden block bg-white divide-y divide-gray-200">
    {files.map((file) => (
      <tr key={file.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="flex flex-row justify-left align-center w-full">
            <div className="w-12">
              <Image src={getThumbnail(file)} height={50} width={50} />
            </div>

            <div className="ml-4">
              <p className="text-lg">{file?.name}</p>
              <p className="text-md">{file?.unlock_info?.type}</p>
              <p className="text-md font-light">
                {makeDatePretty(file.created_at)}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between px-4 w-full mt-2 pt-4">
            <button onClick={() => copyLink(file)}>
              <ShareIcon className="w-6" />
            </button>
            <button
              onClick={() => openDeleteModal(file)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              <TrashIcon className="w-6" />
            </button>
          </div>
        </td>              
      </tr>
    ))}
  </tbody>
  )
}

export default MobileTable