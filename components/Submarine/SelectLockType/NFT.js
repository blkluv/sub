import { InformationCircleIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import NFTDetail from "./NFTDetail";
import TokenIdModal from "./TokenIdModal";
import UpdateAuthorityModal from "./UpdateAuthorityModal";

const networkOptions = {
  Ethereum: ["Mainnet", "Rinkeby"],
  Polygon: ["Mainnet", "Mumbai"],
  Avalanche: ["Mainnet", "Fuji"],
  Solana: ["Mainnet-Beta", "Devnet"],
};

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
  blockchain,
  setBlockchain,
  blockchainOptions,
  tokenId, 
  setTokenId, 
  updateAuthority, 
  setUpdateAuthority
}) => {
  const [nftLockType, setNftLockType] = useState(blockchainOptions ? blockchainOptions[0] : null);
  const [tokenIdModalOpen, setTokenIdModalOpen] = useState(false);
  const [updateAuthorityModalOpen, setUpdateAuthorityModalOpen] = useState(false);

  const renderBlockchainSelector = () => {
    if(blockchainOptions) {
      return (
        <div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="blockchain"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Blockchain*
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex">
                <select
                  id="blockchain"
                  name="blockchain"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-pinata-purple focus:border-pinata-purple sm:text-sm rounded-md"
                  value={blockchain}
                  onChange={(e) => setBlockchain(e.target.value)}
                >
                  {blockchainOptions.map((o) => {
                    return <option key={o}>{o}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
  };

  const renderNetworkSelector = () => {
    if (blockchain) {
      return (
        <div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="network"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Network*
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex">
                <select
                  id="network"
                  name="network"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-pinata-purple focus:border-pinata-purple sm:text-sm rounded-md"
                  value={network || "Select one..."}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <option>Select One...</option>
                  {networkOptions[blockchain].map((o) => {
                    return <option key={o}>{o}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  };

  const renderContractAddress = () => {
    if (blockchain && network) {
      switch (blockchain) {
        case "Solana":
          return (
            <div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Update Authority* <button onClick={() => setUpdateAuthorityModalOpen(true)}><InformationCircleIcon className="h-4 w-4 text-black" aria-hidden="true" /></button>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex">
                  <input
                    value={updateAuthority}
                    onChange={(e) => setUpdateAuthority(e.target.value)}
                    type="text"
                    name="nft"
                    required
                    id="nft"
                    autoComplete="off"
                    placeholder="Update authority"
                    className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
            <UpdateAuthorityModal updateAuthorityModalOpen={updateAuthorityModalOpen} setUpdateAuthorityModalOpen={setUpdateAuthorityModalOpen} />                 
            </div>
          )
        default:
          return (
            <div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Contract Address*
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
                    autoComplete="off"
                    placeholder="Contract address"
                    className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Token ID (Optional) <button onClick={() => setTokenIdModalOpen(true)}><InformationCircleIcon className="h-4 w-4 text-black" aria-hidden="true" /></button>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex">
                  <input
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    type="text"
                    name="tokenId"
                    id="tokenId"
                    autoComplete="off"
                    placeholder="Token ID"
                    className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
                  />
                </div>
              </div>
            </div>
            <TokenIdModal open={tokenIdModalOpen} setOpen={setTokenIdModalOpen} />
            </div>
          );
      }
    }
  };

  return (
    <div>
      <div>
        <h3 className="text-gray-900 font-bold text-2xl">
          Allow content to be unlocked with ownership of an NFT
        </h3>
        <p className="text-gray-600">
          Provide details about the NFT to be used to unlock the content, and
          anyone trying to access your file will not be able to access it unless
          they own the NFT specified.
        </p>
      </div>

      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
        {renderBlockchainSelector()}
        {renderNetworkSelector()}
        {renderContractAddress()}
        <NFTDetail
          onThumbnailChange={onThumbnailChange}
          thumbnail={thumbnail}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          onFileChange={onFileChange}
          selectedFiles={selectedFiles}
        />
      </div>
    </div>
  );
};

export default NFT;
