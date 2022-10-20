import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { setAlert } from "../../../store/slices/alertSlice";
import { setSubmarinedContent } from "../../../store/slices/submarinedContentSlice";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
import CustomButton from "../CustomButton";

interface BaseLockTypeProps {
  fileInfo: MetadataUnlockInfo;
  handleVerify: () => Promise<SubmarinedContent | void>;
  description: JSX.Element;
  lockName: string;
}
const BaseLockType = ({ fileInfo, description, handleVerify, lockName }: BaseLockTypeProps) => {
  const [verifying, setVerifying] = React.useState(false);
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    setVerifying(true);
    try {
      const submarinedContent = await handleVerify();
      if (submarinedContent) {
        dispatch(setSubmarinedContent(submarinedContent));
        setVerifying(false);
      }
    } catch (err) {
      setAlert({ type: "error", message: err });
    }
  };

  console.log(fileInfo, isButtonCustom(fileInfo));
  return (
    <div>
      {description}
      {isButtonCustom(fileInfo) ? (
        <CustomButton
          fileInfo={fileInfo}
          onClick={handleClick}
          lockName={lockName}
          loading={verifying}
        />
      ) : (
        <Button onClick={handleClick}>
          {verifying ? `Verifying ${lockName}...` : `Verify ${lockName}`}
        </Button>
      )}
    </div>
  );
};

export default BaseLockType;

const isButtonCustom = (fileInfo) => {
  if (
    fileInfo.customizations &&
    fileInfo.customizations.buttonColor &&
    fileInfo.customizations.buttonColor.hex
  ) {
    return true;
  }

  if (
    fileInfo.customizations &&
    fileInfo.customizations.buttonTextColor &&
    fileInfo.customizations.buttonTextColor.hex
  ) {
    return true;
  }

  if (
    fileInfo.customizations &&
    fileInfo.customizations.buttonShape &&
    fileInfo.customizations.buttonShape !== "rounded"
  ) {
    return true;
  }

  return false;
};
