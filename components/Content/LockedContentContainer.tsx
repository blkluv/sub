import Image from "next/future/image";
import React from "react";
import LocationUnlock from "./LockType/Location";
import Solana from "./LockType/Solana";
import NFT from "./LockType/NFT";
import Retweet from "./LockType/Retweet";
import { MetadataUnlockInfo } from "../Submarine/SelectLockType/SubmarineFileForm";
import { UnlockInfo } from "../../types/UnlockInfo";

export const EVMChains = ["Ethereum", "Polygon", "Avalanche"];
interface LockedContentContainerProps {
  fileInfo: MetadataUnlockInfo;
  gatewayUrl: string;
}
const LockedContentContainer = ({ fileInfo, gatewayUrl }: LockedContentContainerProps) => {
  const getLockType = (unlockInfo: UnlockInfo) => {
    const type = unlockInfo.type;
    switch (type) {
      case "location":
        return <LocationUnlock fileInfo={fileInfo} />;
      case "nft":
        if (unlockInfo.blockchain === "Solana") {
          return <Solana fileInfo={fileInfo} />;
        } else if (EVMChains.includes(unlockInfo.blockchain)) {
          return <NFT fileInfo={fileInfo} />;
        }
      case "retweet":
        return <Retweet fileInfo={fileInfo} />;
      default:
        return <div>Unknown lock type</div>;
    }
  };

  const LockType = getLockType(fileInfo.unlockInfo);
  return (
    <div>
      {fileInfo?.thumbnail?.length > 0 && typeof fileInfo.thumbnail === "string" ? (
        <Image
          className="mb-8 mt-6 w-24 h-24 m-auto rounded-full"
          src={`${gatewayUrl}/ipfs/${fileInfo.thumbnail}`}
          alt={`${fileInfo.name} preview`}
          width={100}
          height={100}
        />
      ) : (
        fileInfo?.thumbnail?.length > 0 && (
          <Image
            className="mb-8 mt-6 w-24 h-24 m-auto rounded-full"
            src={fileInfo?.thumbnail && fileInfo?.thumbnail[0]?.preview}
            alt={`${fileInfo.name} preview`}
            width={100}
            height={100}
          />
        )
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">{fileInfo.name}</span>
      </h2>
      <h4 className="mt-4 text-muted text-xl">{fileInfo.description}</h4>
      <div className="mt-10 flex justify-center">{LockType}</div>
    </div>
  );
};

export default LockedContentContainer;
