import React, { useState } from "react";
import UploadFile from "../../Upload/UploadFile";
import UploadThumbnail from "../../Upload/UploadThumbnail";
import NetworkSelection from "./NFTNetworkSelection";

const NFT = ({
  onFileChange,
  selectedFiles,
  contractAddress,
  setContractAddress,
  network,
  setNetwork,
  networks,
  name,
  setName,
  thumbnail,
  setThumbnail,
  description,
  setDescription,
  onThumbnailChange,
}) => {
  return (
    <div>
      <div>
        <h3 className="text-gray-900 font-bold text-2xl">
          Allow content to be unlocked with ownership of an ERC721 NFT
        </h3>
        <p className="text-gray-600">
          All you have to do is provide the NFT contract address, provide the
          network, and anyone trying to access your file will not be able to
          access it unless they own an NFT minted from that contract.
        </p>
      </div>

      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnail
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="flex items-center">
              <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                {thumbnail && thumbnail.length > 0 ? (
                  <img
                    className="h-12 w-12"
                    src={thumbnail[0]?.preview}
                    alt="preview for thumbnail"
                  />
                ) : (
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </span>
              <UploadThumbnail onThumbnailChange={onThumbnailChange} />
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Contract Address
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex">
              <input
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                type="text"
                name="nft"
                required
                id="nft"
                placeholder="Contract address"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Network Name
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex rounded-md shadow-sm">
              <NetworkSelection
                selected={network}
                setSelected={setNetwork}
                networks={networks}
              />
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Name
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                required
                id="name"
                placeholder="Give your unlockable content a name"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md p-2"
              />
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
          >
            Description
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                id="description"
                required
                placeholder="Describe the content"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md p-2"
              />
            </div>
          </div>
        </div>
        <UploadFile onFileChange={onFileChange} selectedFiles={selectedFiles} />
      </div>
    </div>
  );
};

export default NFT;
