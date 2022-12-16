import { MenuItem } from "@mui/material";
import { Field } from "formik";
import { Select } from "formik-mui";

export const networkOptions = {
  Ethereum: ["Mainnet", "Goerli"],
  Polygon: ["Mainnet", "Mumbai"],
  Avalanche: ["Mainnet", "Fuji"],
  Solana: ["Mainnet-Beta", "Devnet"],
  Flow: ["Mainnet", "Testnet"],
};

const NetworkSelector = ({ blockchain }) => {
  return (
    <Field
      component={Select}
      id="unlockInfo.network"
      name="unlockInfo.network"
      label="Network"
      inputProps={{
        fullwidth: "true",
      }}
      variant="standard"
    >
      {networkOptions[blockchain].map((o) => (
        <MenuItem key={o} value={o}>
          {o}
        </MenuItem>
      ))}
    </Field>
  );
};

export default NetworkSelector;
