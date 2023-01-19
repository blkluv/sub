import { Unstable_Grid2 } from "@mui/material";
import { useState } from "react";
import FormikTextfield from "../../../../Form/FormikTextfield";
import InformationCircleIconStyled from "../../../../Form/InformationCircleIconStyled";
import TokenIdDialog from "../../TokenIdDialog";
import * as Yup from "yup";
import { BlockchainOptions, UnlockInfoETH } from "../../../../../types/UnlockInfo";

type ContractAddressType = React.FC & { unlockInfoSchema: Yup.ObjectSchema<any> } & {
  unlockInfo: UnlockInfoETH;
};
const ContractAddress: ContractAddressType = () => {
  // const [tokenIdDialogOpen, setTokenIdDialogOpen] = useState(false);
  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em" }}>
      <FormikTextfield type="text" name="unlockInfo.contract" label="Contract Address" required />
      {/* <FormikTextfield
        type="text"
        name="unlockInfo.tokenId"
        label="Token ID"
        adornment={
          <span
            style={{ cursor: "pointer" }}
            aria-label="button"
            onClick={() => setTokenIdDialogOpen(true)}
          >
            <InformationCircleIconStyled />
          </span>
        }
      />
      <TokenIdDialog open={tokenIdDialogOpen} setOpen={setTokenIdDialogOpen} /> */}
    </Unstable_Grid2>
  );
};

ContractAddress.unlockInfoSchema = Yup.object().shape({
  blockchain: Yup.string().required("Required"),
  network: Yup.string().required("Required"),
  tokenId: Yup.number().typeError("Token id must be a number"),
  contract: Yup.string()
    .required("Required")
    .test(
      "address-is-valid",
      "Not a valid address.",
      (value: string) => value?.startsWith("0x") && value?.length === 18
    ),
});
// value.startsWith("0x") &&
ContractAddress.unlockInfo = {
  type: "nft",
  blockchain: BlockchainOptions.Ethereum,
  network: "",
  tokenId: "",
  contract: "",
};

export default ContractAddress;
