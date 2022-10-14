import { InformationCircleIcon } from "@heroicons/react/outline";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import FormikTextfield from "../../../Form/FormikTextfield";
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
            key="unlockInfo.nft"
            label="Update authority"
            required
            adornment={
              <span
                className="cursor"
                aria-label="button"
                onClick={() => setUpdateAuthorityModalOpen(true)}
              >
                <InformationCircleIcon height={"1.5rem"} width={"1.5rem"} />
              </span>
            }
          />
          <Divider variant="middle" flexItem />
          <FormikTextfield
            type="text"
            key="unlockInfo.mintAddress"
            label="Mint Address"
            adornment={
              <span
                className="cursor"
                aria-label="button"
                onClick={() => setMintAddressModalOpen(true)}
              >
                <InformationCircleIcon height={"1.5rem"} width={"1.5rem"} />
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
            key="unlockInfo.contract"
            label="Contract Address"
            required
          />
          <FormikTextfield
            type="text"
            key="unlockInfo.contract"
            label="Token ID"
            adornment={
              <span
                className="cursor"
                aria-label="button"
                onClick={() => setTokenIdModalOpen(true)}
              >
                <InformationCircleIcon height={"1.5rem"} width={"1.5rem"} />
              </span>
            }
          />
          <TokenIdModal open={tokenIdModalOpen} setOpen={setTokenIdModalOpen} />
        </Box>
      );
  }
};

export default ContractAddress;
