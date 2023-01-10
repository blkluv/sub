import { MenuItem } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { BlockchainOptions, UnlockInfoNFT } from "../../../../types/UnlockInfo";
import { Select } from "formik-mui";
import { MetadataUnlockInfo } from "../SubmarineFileForm";
import { useEffect } from "react";

const BlockchainSelector = ({ setBlockchain }) => {
  const { setFieldValue, setFieldTouched, values } = useFormikContext<MetadataUnlockInfo>();
  //@ts-ignore
  const unlockInfo: UnlockInfoNFT = values.unlockInfo;
  const selectedBlockchain = unlockInfo.blockchain;

  useEffect(() => {
    setBlockchain(selectedBlockchain);
  }, [selectedBlockchain]);
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
