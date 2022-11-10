import { Unstable_Grid2 } from "@mui/material";
import { useState } from "react";
import FormikTextfield from "../../../Form/FormikTextfield";
import InformationCircleIconStyled from "../../../Form/InformationCircleIconStyled";
import MintAddressModal from "../MintAddressModal";
import TokenIdModal from "../TokenIdModal";
import UpdateAuthorityDialog from "../UpdateAuthorityDialog";

const ContractAddress = ({ blockchain }) => {
  const [tokenIdModalOpen, setTokenIdModalOpen] = useState(false);
  const [updateAuthorityDialogOpen, setUpdateAuthorityDialogOpen] = useState(false);
  const [mintAddressModalOpen, setMintAddressModalOpen] = useState(false);
  switch (blockchain) {
    case "Solana":
      return (
        <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em" }}>
          <FormikTextfield
            type="text"
            name="unlockInfo.mintAddress"
            label="Mint Address"
            required
            adornment={
              <span aria-label="button" onClick={() => setMintAddressModalOpen(true)}>
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
          <MintAddressModal
            mintAddressModalOpen={mintAddressModalOpen}
            setMintAddressModalOpen={setMintAddressModalOpen}
          />
        </Unstable_Grid2>
      );
    default:
      return (
        <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em" }}>
          <FormikTextfield
            type="text"
            name="unlockInfo.contract"
            label="Contract Address"
            required
          />
          <FormikTextfield
            type="text"
            name="unlockInfo.tokenId"
            label="Token ID"
            required
            adornment={
              <span
                style={{ cursor: "pointer" }}
                aria-label="button"
                onClick={() => setTokenIdModalOpen(true)}
              >
                <InformationCircleIconStyled />
              </span>
            }
          />
          <TokenIdModal open={tokenIdModalOpen} setOpen={setTokenIdModalOpen} />
        </Unstable_Grid2>
      );
  }
};

export default ContractAddress;
