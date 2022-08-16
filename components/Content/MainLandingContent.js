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
import Loading from "../Dashboard/Loading";
import CustomLogo from "./CustomLogo";
import CustomButton from "./CustomButton";
import Head from "next/head";

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
  preview,
}) => {
  const [{ data, error }, connect] = useConnect();
  const [solSigning, setSolSigning] = useState(false);
  const [gatewayUrl, setGatewayUrl] = useState("");
  
  useEffect(() => {
    setGatewayUrl(localStorage.getItem("sm-gateway"))
  }, []);

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
    if (!navigator.geolocation) {
      setVerifying(false);
      alert("Your device does not support geolocation");
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const res = await axios.post("/api/location/verify", {
              userLat: latitude,
              userLong: longitude,
              shortId: window.location.pathname.split("/")[1],
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
            alert(error.response.data);
          }

          setVerifying(false);
        },
        (error) => {
          setVerifying(false);
          alert(
            "Location services may be disabled on your device, please enable them."
          );
        }
      );
    }
  };

  const forcedStyle = () => {
    if (
      fileInfo &&
      fileInfo.customizations &&
      fileInfo.customizations.backgroundCid
    ) {
      return {
        backgroundImage: `url(${gatewayUrl}/ipfs/${fileInfo.customizations.backgroundCid})`,
      };
    } else {
      return {};
    }
  };

  const isButtonCustom = () => {
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

  const hasCustomFont = () => {
    if (fileInfo.customizations && fileInfo.customizations.fontFamily) {
      return true;
    }

    return false;
  };

  if (!fileInfo) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const getCustomFont = () => {
    const { fontFamily } = fileInfo?.customizations;

    return { fontFamily: `'${fontFamily}', sans-serif` };
  };

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Montserrat:wght@300&family=Open+Sans:wght@300&family=Oswald:wght@300&family=Roboto+Condensed:wght@300&family=Roboto:wght@300&family=Source+Sans+Pro:wght@300&display=swap"
          rel="stylesheet"
        ></link>
        <title>{data && data.name ? data.name : "Submarine.me"}</title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LDJ4RPGPGE"
        ></script>
      </Head>

      <div style={hasCustomFont() ? getCustomFont() : {}}>
        <div className="absolute p-4 flex flex-row">
          <div>
            {fileInfo.customizations && fileInfo.customizations.logoCid ? (
              <CustomLogo logo={fileInfo.customizations.logoCid} />
            ) : (
              <SubmarineLogoSvg />
            )}
          </div>
        </div>
        <div
          style={forcedStyle()}
          className={`${
            !fileInfo?.customizations?.backgroundCid ? "public-content-bg" : ""
          } bg-cover bg-no-repeat ${
            fileInfo.preview ? "w-full" : "w-screen"
          } min-h-screen flex flex-col justify-center align-center`}
        >
          <div className="p-10 md:w-1/2 w-auto mx-2 h-auto max-h-3/4 text-center flex flex-col align-center md:m-auto bg-white shadow-lg rounded-lg mt-36 mb-36 md:mt-36 md:mb-36">
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
                {fileInfo?.thumbnail?.length > 0 &&
                typeof fileInfo.thumbnail === "string" ? (
                  <img
                    className="mb-8 mt-6 w-24 h-24 m-auto rounded-full"
                    src={`${gatewayUrl}/ipfs/${fileInfo.thumbnail}`}
                    alt={`${fileInfo.name} preview`}
                  />
                ) : fileInfo?.thumbnail?.length > 0 && (
                  <img
                    className="mb-8 mt-6 w-24 h-24 m-auto rounded-full"
                    src={fileInfo?.thumbnail && fileInfo?.thumbnail[0]?.preview}
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
                            {isButtonCustom() ? (
                              <CustomButton
                                fileInfo={fileInfo}
                                onClick={() => hanldeSolSign()}
                                buttonText={"Verify Ownership"}
                                loadingText={"Unlocking..."}
                                loading={solSigning}
                              />
                            ) : (
                              <button
                                onClick={() => hanldeSolSign()}
                                className="m-auto w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                              >
                                {solSigning
                                  ? "Unlocking..."
                                  : "Verify Ownership"}
                              </button>
                            )}
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
                          {isButtonCustom() ? (
                            <CustomButton
                              onClick={() => handleSign()}
                              fileInfo={fileInfo}
                              buttonText={"Unlock"}
                              loadingText={"Unlocking..."}
                              loading={signing}
                            />
                          ) : (
                            <button
                              onClick={() => handleSign()}
                              className="w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                            >
                              {signing ? "Unlocking..." : "Unlock"}
                            </button>
                          )}
                        </div>
                      ) : (
                        <div>
                          {data.connectors.map((connector) => {
                            return (
                              <div key={connector.name}>
                                {connector.ready && isButtonCustom() ? (
                                  <CustomButton
                                    onClick={() => connect(connector)}
                                    fileInfo={fileInfo}
                                    buttonText={connector.name}
                                    loadingText={connector.name}
                                  />
                                ) : (
                                  connector.ready && (
                                    <button
                                      className="m-2 inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                                      disabled={!connector.ready}
                                      key={connector.id}
                                      onClick={() => connect(connector)}
                                    >
                                      {connector.name}
                                      {!connector.ready && " (unsupported)"}
                                    </button>
                                  )
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
                        tweetId={
                          fileInfo?.unlockInfo?.tweetUrl &&
                          fileInfo?.unlockInfo?.tweetUrl.split("status/")[1]
                            .split("?")[0]
                        }
                      />
                      <p className="text-muted text-sm">
                        Make sure you have retweeted the above Tweet.
                      </p>
                      {isButtonCustom() ? (
                        <CustomButton
                          fileInfo={fileInfo}
                          onClick={() => twitterAuth()}
                          buttonText={"Connect Your Twitter"}
                          loadingText={"Verifying retweet..."}
                          loading={verifying}
                        />
                      ) : (
                        <button
                          onClick={() => twitterAuth()}
                          className="mt-4 w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
                        >
                          {verifying
                            ? "Verifying retweet..."
                            : "Connect Your Twitter"}
                        </button>
                      )}
                    </div>
                  ) : fileInfo?.unlockInfo?.type === "location" ? (
                    <div>
                      <LocationUnlock
                        fileInfo={fileInfo}
                        verifying={verifying}
                        verifyLocation={verifyLocation}
                        isButtonCustom={isButtonCustom}
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                {fileInfo &&
                  fileInfo.unlockInfo &&
                  fileInfo.unlockInfo.type === "nft" && (
                    <p className="mt-4 mb-4 text-md text-muted">
                      Unlock this content by connecting your wallet to verify
                      you have the required NFT.
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
        {/* <footer className="p-4">
     
        <Pinnie />
     
      </footer> */}
      </div>
    </div>
  );
};

export default MainLandingContent;
