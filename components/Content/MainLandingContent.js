import React, { useState, useEffect } from "react";
import Pinnie from "../Pinnie";
import SubmarineLogoSvg from "../SubmarineLogoSvg";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useSolana } from "../../hooks/useSolana";
import { useWallet } from "@solana/wallet-adapter-react";
import Gallery from "./Gallery";
import { Tweet } from "react-twitter-widgets";
import { useTwitter } from "../../hooks/useTwitter";
import { EVMChains } from "../../hooks/useMetamask";
import { useConnect, useSignMessage } from "wagmi";
import axios from "axios";
import LocationUnlock from "./LocationUnlock";

const MainLandingContent = ({
  setGallery,
  setFullResponse,
  loading,
  handleSign,
  fileInfo,
  signing,
  gallery,
  fullResponse,
  handleChangePage,
  verifying,
  setVerifying, 
  eth,
}) => {
  const [{ data, error }, connect] = useConnect();
  const [solSigning, setSolSigning] = useState(false);

  const { twitterAuth } = useTwitter();
  const { signData } = useSolana();

  const wallet = useWallet();

  const hanldeSolSign = async () => {
    try {
      setSolSigning(true);
      const res = await signData(fileInfo);
      if (res && !res.directory) {
        setSolSigning(false);
        window.location.replace(
          `${res.gateway}/ipfs/${res.cid}?accessToken=${res.token}`
        );
      } else if (res && res.html) {
        setSolSigning(false);
        window.location.replace(
          `${res.gateway}/ipfs/${res.cid}/index.html?accessToken=${res.token}`
        );
      } else {
        setFullResponse(res);
        setGallery(true);
      }
    } catch (error) {
      setSolSigning(false);
      alert(error.message);
    }
  };

  const verifyLocation = async () => {
    setVerifying(true);
    if(!navigator.geolocation) {
      setVerifying(false);
      alert("geolocation not supported");      
    } else {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
          const res = await axios.post("/api/location/verify", {
            userLat: latitude, 
            userLong: longitude, 
            shortId: window.location.pathname.split("/")[1]
          });
          const data = res.data;
          if (data && !data.directory) {
            setSolSigning(false);
            window.location.replace(
              `${data.gateway}/ipfs/${data.cid}?accessToken=${data.token}`
            );
          } else if (data && data.html) {
            setSolSigning(false);
            window.location.replace(
              `${data.gateway}/ipfs/${data.cid}/index.html?accessToken=${data.token}`
            );
          } else {
            setFullResponse(data);
            setGallery(true);
          }
        } catch (error) {
          setVerifying(false);          
          alert(error.response.data)
        }
        
        setVerifying(false);   
      }, (error) => {
        setVerifying(false);
        alert(error);
      });
    }
  }

  
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
        <div className="p-10 md:w-1/2 w-5/6 h-auto max-h-3/4 text-center flex flex-col align-center m-auto bg-white overflow-scroll shadow-lg rounded-lg">
          {loading ? (
            <div>
              <h1>Loading...</h1>
            </div>
          ) : gallery ? (
            <Gallery
              name={fileInfo.name}
              fullResponse={fullResponse}
              handleChangePage={handleChangePage}
            />
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
                {fileInfo &&
                fileInfo.unlockInfo &&
                fileInfo.unlockInfo.type === "nft" &&
                fileInfo.unlockInfo.blockchain &&
                fileInfo.unlockInfo.blockchain === "Solana" ? (
                  <div className="inline-flex w-1/2">
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
                  </div>
                ) : fileInfo &&
                  fileInfo.unlockInfo &&
                  fileInfo.unlockInfo.type === "nft" &&
                  fileInfo.unlockInfo.blockchain &&
                  EVMChains.includes(fileInfo.unlockInfo.blockchain) ? (
                  <div>
                    {data.connected.toString() === "true" ? (
                      <div>
                        <button
                          onClick={() => handleSign()}
                          className="w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                        >
                          {signing ? "Unlocking..." : "Unlock"}
                        </button>
                      </div>
                    ) : (
                      <div>
                        {data.connectors.map((connector) => {
                          return (
                            <div key={connector.name}>
                              {connector.ready && (
                                <button
                                  className="m-2 inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                                  disabled={!connector.ready}
                                  key={connector.id}
                                  onClick={() => connect(connector)}
                                >
                                  {connector.name}
                                  {!connector.ready && " (unsupported)"}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : fileInfo &&
                  fileInfo.unlockInfo &&
                  fileInfo.unlockInfo.type === "retweet" ? (
                  <div className="max-w-full m-auto text-center">
                    {/* <a className="text-sm underline" href={fileInfo.unlockInfo.tweetUrl} target="_blank" rel="noopener noreferrer">Make sure you have retweeted this tweet</a> */}
                    <Tweet
                      tweetId={fileInfo.unlockInfo.tweetUrl.split("status/")[1].split("?")[0]}
                    />
                    <p className="text-muted text-sm">
                      Make sure you have retweeted the above Tweet.
                    </p>
                    <button
                      onClick={() => twitterAuth()}
                      className="mt-4 w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                    >
                      {verifying
                        ? "Verifying retweet..."
                        : "Connect Your Twitter"}
                    </button>
                  </div>
                ) : fileInfo?.unlockInfo?.type === "location" ? 
                  <div>
                    <LocationUnlock fileInfo={fileInfo} verifying={verifying} verifyLocation={verifyLocation} />
                  </div>
                : (
                  <div />
                )}
              </div>
              {fileInfo &&
                fileInfo.unlockInfo &&
                fileInfo.unlockInfo.type === "nft" && (
                  <p className="mt-4 mb-4 text-md text-muted">
                    Unlock this content by connecting your wallet to verify you
                    have the required NFT.
                  </p>
                )}

              {fileInfo.unlockInfo &&
                fileInfo.unlockInfo.type === "retweet" && (
                  <p className="mt-4 mb-4 text-md text-muted">
                    Unlock this content by retweeting the above tweet and
                    signing in with your Twitter account.
                  </p>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLandingContent;
