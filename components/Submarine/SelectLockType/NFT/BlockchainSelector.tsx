import { MenuItem } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { BlockchainOptions } from "../../../../types/UnlockInfo";
import { Select } from "formik-mui";

const BlockchainSelector = ({ setBlockchain }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  return (
    <Field
      inputProps={{
        fullwidth: "true",
      }}
      component={Select}
      id="unlockInfo.blockchain"
      name="unlockInfo.blockchain"
      label="Blockchain"
      variant="standard"
      onChange={(e) => {
        setBlockchain(e.target.value);
        setFieldTouched("unlockInfo.network", false);
        setFieldValue("unlockInfo.network", "");
      }}
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
