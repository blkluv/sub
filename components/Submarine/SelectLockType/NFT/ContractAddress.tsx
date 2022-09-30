import { InformationCircleIcon } from "@heroicons/react/outline";
import { Field } from "formik";
import { useState } from "react";
import MintAddressModal from "../MintAddressModal";
import TokenIdModal from "../TokenIdModal";
import UpdateAuthorityModal from "../UpdateAuthorityModal";

const ContractAddress = ({ blockchain }) => {
  const [tokenIdModalOpen, setTokenIdModalOpen] = useState(false);
  const [updateAuthorityModalOpen, setUpdateAuthorityModalOpen] = useState(false);
  const [mintAddressModalOpen, setMintAddressModalOpen] = useState(false);
  switch (blockchain) {
    case "Solana":
      return (
        <div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
            <label
              htmlFor="unlockInfo.contract"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
            >
              <span>Update Authority*</span>{" "}
              <span
                className="cursor"
                aria-label="button"
                onClick={() => setUpdateAuthorityModalOpen(true)}
              >
                <InformationCircleIcon
                  className="h-6 w-6 -mt-2 ml-2 text-black"
                  aria-hidden="true"
                />
              </span>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex">
                <Field
                  type="text"
                  name="unlockInfo.nft"
                  required
                  id="unlockInfo.nft"
                  autoComplete="off"
                  placeholder="Update authority"
                  className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
                />
              </div>
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:py-5">
            <label
              htmlFor="mintAddress"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mt-4 flex flex-row"
            >
              <span>Mint Address (optional)</span>{" "}
              <span
                className="cursor"
                aria-label="button"
                onClick={() => setMintAddressModalOpen(true)}
              >
                <InformationCircleIcon
                  className="h-6 w-6 -mt-2 ml-2 text-black"
                  aria-hidden="true"
                />
              </span>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex">
                <Field
                  type="text"
                  id="unlockInfo.mintAddress"
                  autoComplete="off"
                  placeholder="Mint Address"
                  className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
                />
              </div>
            </div>
          </div>
          <UpdateAuthorityModal
            updateAuthorityModalOpen={updateAuthorityModalOpen}
            setUpdateAuthorityModalOpen={setUpdateAuthorityModalOpen}
          />
          <MintAddressModal
            mintAddressModalOpen={mintAddressModalOpen}
            setMintAddressModalOpen={setMintAddressModalOpen}
          />
        </div>
      );
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
                <Field
                  type="text"
                  name="unlockInfo.contract"
                  required
                  id="unlockInfo.contract"
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
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row mt-4"
            >
              <span>Token ID (Optional)</span>{" "}
              <span
                className="cursor"
                aria-label="button"
                onClick={() => setTokenIdModalOpen(true)}
              >
                <InformationCircleIcon className="ml-2 h-6 w-6 text-black -mt-2" />
              </span>
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex">
                <Field
                  type="text"
                  name="unlockInfo.tokenId"
                  id="unlockInfo.tokenId"
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
};

export default ContractAddress;
