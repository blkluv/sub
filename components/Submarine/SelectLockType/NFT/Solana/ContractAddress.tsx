import { Unstable_Grid2 } from "@mui/material";
import { useState } from "react";
import FormikTextfield from "../../../../Form/FormikTextfield";
import InformationCircleIconStyled from "../../../../Form/InformationCircleIconStyled";
import MintAddressDialog from "../../MintAddressDialog";
import UpdateAuthorityDialog from "../../UpdateAuthorityDialog";
import * as Yup from "yup";
import { BlockchainOptions, UnlockInfoSolana } from "../../../../../types/UnlockInfo";

const ContractAddress: React.FC & { unlockInfoSchema: Yup.ObjectSchema<any> } & {
  unlockInfo: UnlockInfoSolana;
} = () => {
  const [updateAuthorityDialogOpen, setUpdateAuthorityDialogOpen] = useState(false);
  const [mintAddressDialogOpen, setMintAddressDialogOpen] = useState(false);
  return (
    <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em" }}>
      <FormikTextfield
        type="text"
        name="unlockInfo.mintAddress"
        label="Mint Address"
        required
        adornment={
          <span
            aria-label="button"
            style={{ cursor: "pointer" }}
            onClick={() => setMintAddressDialogOpen(true)}
          >
            <InformationCircleIconStyled />
          </span>
        }
      />
      <FormikTextfield
        type="text"
        name="unlockInfo.updateAuthority"
        label="Update Authority"
        required
        adornment={
          <span
            style={{ cursor: "pointer" }}
            aria-label="button"
            onClick={() => setUpdateAuthorityDialogOpen(true)}
          >
            <InformationCircleIconStyled />
          </span>
        }
      />
      <UpdateAuthorityDialog
        updateAuthorityDialogOpen={updateAuthorityDialogOpen}
        setUpdateAuthorityDialogOpen={setUpdateAuthorityDialogOpen}
      />
      <MintAddressDialog
        mintAddressDialogOpen={mintAddressDialogOpen}
        setMintAddressDialogOpen={setMintAddressDialogOpen}
      />
    </Unstable_Grid2>
  );
};

const unlockInfoSchema = Yup.object().shape({
  blockchain: Yup.string().required("Required"),
  network: Yup.string().required("Required"),
  mintAddress: Yup.string()
    .required("Required")
    .min(32, "Not a valid address.")
    .max(44, "Not a valid address."),
  updateAuthority: Yup.string().required("Required"),
});
ContractAddress.unlockInfoSchema = unlockInfoSchema;

ContractAddress.unlockInfo = {
  type: "nft",
  blockchain: BlockchainOptions.Solana,
  network: "",
  mintAddress: "",
  updateAuthority: "",
};

export default ContractAddress;
