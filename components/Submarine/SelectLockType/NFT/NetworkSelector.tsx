import { Field } from "formik";
import React from "react";

const networkOptions = {
  Ethereum: ["Mainnet", "Rinkeby"],
  Polygon: ["Mainnet", "Mumbai"],
  Avalanche: ["Mainnet", "Fuji"],
  Solana: ["Mainnet-Beta", "Devnet"],
};

const NetworkSelector = ({ blockchain }) => {
  return (
    <div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="unlockInfo.network"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Network*
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <Field
              as="select"
              id="unlockInfo.network"
              name="unlockInfo.network"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-pinata-purple focus:border-pinata-purple sm:text-sm rounded-md"
            >
              <option>Select One...</option>
              {networkOptions[blockchain].map((o) => {
                return <option key={o}>{o}</option>;
              })}
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSelector;
