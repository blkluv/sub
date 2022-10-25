import { Unstable_Grid2 } from "@mui/material";
import FormikTextfield from "../../../Form/FormikTextfield";

export default function TwitterForm() {
  return (
    <Unstable_Grid2 container spacing={2}>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex">
          <FormikTextfield
            type="url"
            label="Tweet Url"
            name="unlockInfo.tweetUrl"
            required
            id="unlockInfo.tweetUrl"
            autoComplete="off"
            placeholder="Tweet URL*"
            className="outline-none focus:ring-pinata-purple focus:border-pinata-purple block w-full sm:text-sm border border-gray-200 rounded-md p-2"
          />
        </div>
      </div>
    </Unstable_Grid2>
  );
}
