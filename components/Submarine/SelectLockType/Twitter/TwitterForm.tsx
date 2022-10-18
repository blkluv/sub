import { Unstable_Grid2 } from "@mui/material";
import { Field } from "formik";

export default function TwitterForm() {
  return (
    <Unstable_Grid2 container spacing={2}>
      <label
        htmlFor="unlockInfo.tweetUrl"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 flex flex-row"
      >
        <span>Tweet URL*</span>
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex">
          <Field
            type="url"
            name="unlockInfo.tweetUrl"
            required
            id="unlockInfo.tweetUrl"
            autoComplete="off"
            placeholder="Tweet URL"
            className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
          />
        </div>
      </div>
    </Unstable_Grid2>
  );
}
