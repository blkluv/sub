import { MenuItem } from "@mui/material";
import { Field } from "formik";
import { Select } from "formik-mui";

const networkOptions = {
  Ethereum: ["Mainnet", "Rinkeby"],
  Polygon: ["Mainnet", "Mumbai"],
  Avalanche: ["Mainnet", "Fuji"],
  Solana: ["Mainnet-Beta", "Devnet"],
};

const NetworkSelector = ({ blockchain }) => {
  return (
    <Field
      component={Select}
      id="unlockInfo.network"
      name="unlockInfo.network"
      label="Network"
      fullwidth
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
