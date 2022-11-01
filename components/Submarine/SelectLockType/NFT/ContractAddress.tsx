import { Unstable_Grid2 } from "@mui/material";
import { useState } from "react";
import FormikTextfield from "../../../Form/FormikTextfield";
import InformationCircleIconStyled from "../../../Form/InformationCircleIconStyled";
import MintAddressModal from "../MintAddressModal";
import TokenIdModal from "../TokenIdModal";
import UpdateAuthorityModal from "../UpdateAuthorityModal";

const ContractAddress = ({ blockchain }) => {
  const [tokenIdModalOpen, setTokenIdModalOpen] = useState(false);
  const [updateAuthorityModalOpen, setUpdateAuthorityModalOpen] = useState(false);
  const [mintAddressModalOpen, setMintAddressModalOpen] = useState(false);
  switch (blockchain) {
    case "Solana":
      return (
        <Unstable_Grid2 container direction={"column"} sx={{ gap: "1em" }}>
          <FormikTextfield
            type="text"
            name="unlockInfo.nft"
            label="Update authority"
            required
            adornment={
              <span
                style={{ cursor: "pointer" }}
                aria-label="button"
                onClick={() => setUpdateAuthorityModalOpen(true)}
              >
                <InformationCircleIconStyled />
              </span>
            }
          />
          <FormikTextfield
            type="text"
            name="unlockInfo.mintAddress"
            label="Mint Address"
            adornment={
              <span aria-label="button" onClick={() => setMintAddressModalOpen(true)}>
                <InformationCircleIconStyled />
              </span>
            }
          />
          <UpdateAuthorityModal
            updateAuthorityModalOpen={updateAuthorityModalOpen}
            setUpdateAuthorityModalOpen={setUpdateAuthorityModalOpen}
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
            name="unlockInfo.contract"
            label="Token ID"
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
