import { Divider } from "@mui/material";
import { Box } from "@mui/system";
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
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
          <Divider variant="middle" flexItem />
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
        </Box>
      );
    default:
      return (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <FormikTextfield
            type="text"
            name="unlockInfo.contract"
            label="Contract Address"
            required
          />
          <FormikTextfield
            type="text"
            name="unlockInfo.tokenId"
            label="Token ID*"
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
        </Box>
      );
  }
};

export default ContractAddress;
