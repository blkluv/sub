import { PencilAltIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react'
import { makeDatePretty } from '../../helpers/makePrettyDate';
import Image from "next/image";
import Link from 'next/link';

const MobileTable = ({ files, copyLink, openDeleteModal, getThumbnail }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 border-t-2 border-gray-200">
    <tbody className="sm:hidden flex align-center flex-col block bg-white divide-y divide-gray-200">
    {files.map((file) => (
      <tr key={file.id}>
        <td className="w-screen px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="flex flex-row justify-left align-center w-full">
            <div className="w-12">
              <Image src={getThumbnail(file)} height={50} width={50} />
            </div>

            <div className="ml-4">
              <p className="text-lg">{file?.name}</p>
              <p className="text-md">{file?.unlock_info?.type} {file?.unlock_info?.type === "nft" && ` - ${file?.unlock_info?.blockchain}`}</p>
              <p className="text-md font-light">
                {makeDatePretty(file.created_at)}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between px-4 w-full mt-2 pt-4">
            <button onClick={() => copyLink(file)}>
              <ShareIcon className="w-6" />
            </button>
            
                <Link href={`/submarine/${file?.unlock_info?.type}?edit=${file.short_id}`}><PencilAltIcon className="w-6 cursor-pointer" /></Link>            
            <button
              onClick={() => openDeleteModal(file)}
              className="text-red"
            >
              <TrashIcon className="w-6" />
            </button>
          </div>
        </td>              
      </tr>
    ))}
  </tbody>
  </table>
  )
}

export default MobileTable