import React, { useState } from "react";
import Pinnie from "../Pinnie";
import SubmarineLogoSvg from "../SubmarineLogoSvg";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useSolana } from "../../hooks/useSolana";
import { useWallet } from "@solana/wallet-adapter-react";
// import '@solana/wallet-adapter-react-ui/styles.css';

const MainLandingContent = ({ loading, handleSign, fileInfo, signing }) => {
  const [solSigning, setSolSigning] = useState(false);
  const { signData } = useSolana();

  const wallet = useWallet();

  const hanldeSolSign = async () => {
    try {
      setSolSigning(true);
      const url = await signData(fileInfo);
      if (url) {
        setSolSigning(false);
        window.location.replace(url);
      } else {
        alert("No content found!");
      }
    } catch (error) {
      setSolSigning(false);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="absolute p-4 flex flex-row">
        <div>
          <SubmarineLogoSvg />
        </div>
      </div>
      <div className="absolute bottom-10 right-10 z-10">
        <Pinnie />
      </div>
      <div className="public-content-bg h-screen w-screen flex flex-col justify-center align-center">
        <div className="p-10 md:w-1/2 w-5/6 h-auto text-center flex flex-col justify-center align-center m-auto bg-white overflow-hidden shadow-lg rounded-lg">
          {loading ? (
            <div>
              <h1>Loading...</h1>
            </div>
          ) : (
            <div>
              {fileInfo.thumbnail && (
                <img                  
                  className="mb-8 mt-6 w-24 h-24 m-auto rounded-full"
                  src={`https://opengateway.mypinata.cloud/ipfs/${fileInfo.thumbnail}`}
                  alt={`${fileInfo.name} preview`}
                />
              )}
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">{fileInfo.name}</span>
              </h2>
              <h4 className="mt-4 text-muted text-xl">
                {fileInfo.description}
              </h4>
              <div className="mt-10 flex justify-center">
                <div className="inline-flex w-1/2">
                  {fileInfo &&
                  fileInfo.unlockInfo &&
                  fileInfo.unlockInfo.blockchain &&
                  fileInfo.unlockInfo.blockchain === "Solana" ? (
                    <WalletModalProvider className="fixed z-10 inset-0 overflow-y-auto inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 m-auto">
                      {!wallet.connected ? (
                        <WalletMultiButton className="w-full m-auto inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple" />
                      ) : (
                        <div className="m-auto w-full">
                          <button
                            onClick={() => hanldeSolSign()}
                            className="m-auto w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                          >
                            {solSigning ? "Unlocking..." : "Verify Ownership"}
                          </button>
                          <WalletDisconnectButton className="mt-4 w-full m-auto" />
                        </div>
                      )}
                    </WalletModalProvider>
                  ) : (
                    <button
                      onClick={() => handleSign()}
                      className="w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                    >
                      {signing ? "Unlocking..." : "Connect wallet"}
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-4 mb-4 text-md text-muted">
                Unlock this content by connecting your wallet to verify you have
                the required NFT.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLandingContent;
