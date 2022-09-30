import { Field } from "formik";
import { BlockchainOptions } from "../../../../types/UnlockInfo";

const BlockchainSelector = () => {
  return (
    <div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="unlockInfo.blockchain"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          Blockchain*
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex">
            <Field
              as="select"
              id="unlockInfo.blockchain"
              name="unlockInfo.blockchain"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-pinata-purple focus:border-pinata-purple sm:text-sm rounded-md"
            >
              {Object.entries(BlockchainOptions).map(([key, value]) => {
                return <option key={key}>{value}</option>;
              })}
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlockchainSelector;
