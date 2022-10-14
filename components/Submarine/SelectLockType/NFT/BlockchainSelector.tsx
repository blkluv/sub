import { MenuItem } from "@mui/material";
import { Field } from "formik";
import { BlockchainOptions } from "../../../../types/UnlockInfo";
import { Select } from "formik-mui";

const BlockchainSelector = () => {
  return (
    <Field
      formControl={{ sx: { width: "100%" } }}
      component={Select}
      id="unlockInfo.blockchain"
      name="unlockInfo.blockchain"
      label="Blockchain"
      required={true}
    >
      {Object.entries(BlockchainOptions).map(([key, value]) => (
        <MenuItem key={key} value={value}>
          {key}
        </MenuItem>
      ))}
    </Field>
  );
};
export default BlockchainSelector;
