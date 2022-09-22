import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import Alert from "../../components/Alert";
import Twitter from "../../components/Submarine/SelectLockType/Twitter";
import Location from "../../components/Submarine/SelectLockType/Location";
import ContentLanding from "../../components/Content/ContentLanding";
import { Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import PreviewModal from "../../components/Content/PreviewModal";
import { getKy } from "../../helpers/ky";
import { useAppDispatch } from "../../store/hooks";
import Layout from "../../components/Layout";

const infuraId = process.env.NEXTJS_PUBLIC_INFURA_ID;

const chains = defaultChains;

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "My wagmi app",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

const short = require("short-uuid");

const blockchainOptions = ["Ethereum", "Polygon", "Avalanche", "Solana"];

const UnlockType = () => {
  const networks = [
    { id: 1, name: "ETH - Mainnet" },
    { id: 3, name: "ETH - Rinkeby" },
    { id: 4, name: "Polygon - Mainnet" },
    { id: 5, name: "Polygon - Mumbai" },
  ];

  const router = useRouter();
  const { type, edit } = router.query;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tweetUrl, setTweetUrl] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [updateAuthority, setUpdateAuthority] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [blockchain, setBlockchain] = useState(blockchainOptions[0]);
  const [network, setNetwork] = useState(null);
  const [tokenId, setTokenId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [background, setBackground] = useState([]);
  const [logo, setLogo] = useState([]);
  const [description, setDescription] = useState("");
  const [thumbnailCid, setThumbnailCid] = useState("");
  const [backgroundCid, setBackgroundCid] = useState("");
  const [logoCid, setLogoCid] = useState("");
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [file, setFile] = useState(true);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [distance, setDistance] = useState(0);
  const [submarinedFile, setSubmarinedFile] = useState("");
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const [buttonTextColor, setButtonTextColor] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [unlock, setUnlockInfo] = useState(null);
  const [buttonShape, setButtonShape] = useState("rounded");

  useEffect(() => {
    if (router.query && edit) {
      loadContent();
    }
  }, [router.query, edit]);

  useEffect(() => {
    let newUnlock = {};
    if (unlock) {
      newUnlock = unlock;
    } else {
      newUnlock = {
        type,
        blockchain,
        lat,
        long,
        mintAddress,
        contract: contractAddress,
        distance,
        network,
        tokenId,
        tweetUrl,
        updateAuthority,
      };
    }
    const newFileInfo = {
      shortId: fileInfo?.shortId,
      blockchain,
      contract: contractAddress,
      lat,
      long,
      distance,
      mintAddress,
      network,
      tokenId,
      tweetUrl,
      updateAuthority,
      thumbnail,
      thumbnailCid,
      name,
      description,
      preview: true,
      submarine_cid: submarinedFile,
      unlockInfo: newUnlock,
      customizations: {
        backgroundCid,
        logoCid,
        fontFamily,
        buttonColor,
        buttonTextColor,
        buttonShape,
      },
    };

    setFileInfo(newFileInfo);
  }, [
    blockchain,
    contractAddress,
    lat,
    long,
    distance,
    mintAddress,
    network,
    tokenId,
    tweetUrl,
    updateAuthority,
    logo,
    background,
    backgroundCid,
    logoCid,
    buttonColor,
    buttonTextColor,
    fontFamily,
    thumbnail,
    thumbnailCid,
    buttonShape,
    name,
    description,
    type,
    edit,
  ]);

  const loadContent = async () => {
    setLoading(true);

    const ky = getKy();
    const res = await ky(`/api/content/${edit}`);
    setLoading(false);
    const json = await res.json();
    json.preview = true;
    setFileInfo(json);
    setUnlockInfo(json.unlockInfo);
    const { unlockInfo, description, customizations, id, name, shortId, submarineCID, thumbnail } =
      json;
    const {
      blockchain,
      contract,
      lat,
      long,
      distance,
      mintAddress,
      network,
      tokenId,
      tweetUrl,
      updateAuthority,
    } = unlockInfo;

    setBlockchain(blockchain);
    setContractAddress(contract);
    setLat(lat);
    setLong(long);
    setDistance(distance);
    setMintAddress(mintAddress);
    setNetwork(network);
    setTokenId(tokenId);
    setTweetUrl(tweetUrl);
    setUpdateAuthority(updateAuthority);
    setBackgroundCid(customizations?.backgroundCid);
    setLogoCid(customizations?.logoCid);
    setFontFamily(customizations?.fontFamily);
    setButtonColor(customizations?.buttonColor);
    setButtonTextColor(customizations?.buttonTextColor);
    setDescription(description);
    setName(name);
    setSubmarinedFile(submarineCID);
    setThumbnail(thumbnail);
    setThumbnailCid(thumbnail);
  };

  const FILE_SIZE_LIMIT = 500000000;
  const onFileChange = (e, type) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > FILE_SIZE_LIMIT) {
        alert("File too large, limit is 500mb");
        return;
      }
      Object.assign(files[i], {
        preview: URL.createObjectURL(files[i]),
        formattedSize: files[i].size,
      });
    }

    setSelectedFiles(files);
  };

  const onThumbnailChange = async (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      Object.assign(files[i], {
        preview: URL.createObjectURL(files[i]),
        formattedSize: files[i].size,
      });
    }
    setThumbnail(files);
    const data = new FormData();
    data.append("file", files[0], files[0].name);
    const ky = getKy();
    const res = await ky.post(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/pinning/pinFileToIPFS`, {
      body: data,
    });
    const json = await res.json();
    setThumbnailCid(json.IpfsHash);
  };

  const onBackgroundChange = async (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      Object.assign(files[i], {
        preview: URL.createObjectURL(files[i]),
        formattedSize: files[i].size,
      });
    }
    setBackground(files);

    const data = new FormData();
    data.append("file", files[0], files[0].name);
    setUploadingBackground(true);
    const ky = getKy();
    const res = await ky.post(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/pinning/pinFileToIPFS`, {
      body: data,
    });
    setUploadingBackground(false);
    const response = await res.json();
    setBackgroundCid(response.IpfsHash);
  };

  const onLogoChange = async (e) => {
    console.log("LOGO TIME");
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      Object.assign(files[i], {
        preview: URL.createObjectURL(files[i]),
        formattedSize: files[i].size,
      });
    }
    setLogo(files);

    const data = new FormData();
    data.append("file", files[0], files[0].name);
    setUploadingLogo(true);
    const ky = getKy();
    const res = await ky.post(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/pinning/pinFileToIPFS`, {
      body: data,
    });
    setUploadingLogo(false);
    const resJson = await res.json();
    setLogoCid(resJson.IpfsHash);
  };

  const canSubmit = () => {
    switch (type) {
      case "retweet":
        return tweetUrl.length > 5;
      case "nft":
        return (
          (fileInfo?.submarine_cid || selectedFiles?.length > 0) &&
          (contractAddress || updateAuthority) &&
          network &&
          name &&
          description
        );
      case "location":
        return lat && long && distance;
      default:
        return false;
    }
  };

  const clearFields = () => {
    setSelectedFiles([]);
    setTweetUrl("");
    setContractAddress("");
    setNetwork("");
  };

  const handleUploadAndLinkGeneration = async (e) => {
    try {
      e.preventDefault();
      setUploading(true);
      let cid;
      const identifier = fileInfo?.shortId ? fileInfo?.shortId : short.generate();

      if (!submarinedFile && selectedFiles && selectedFiles.length > 0) {
        const data = new FormData();

        data.append("name", identifier);
        Array.from(selectedFiles).forEach((file) => {
          data.append("files", file);
        });
        data.append("pinToIPFS", "false");

        const ky = getKy();
        const res = await ky(`${process.env.NEXT_PUBLIC_MANAGED_API}/content`, {
          method: "POST",
          body: data,
          timeout: 2147483647,
        });

        const resJson = await res.json();
        cid = resJson.items[0].cid;
      } else {
        cid = submarinedFile;
      }
      const submarinedContent = {
        shortId: identifier,
        name,
        thumbnail: thumbnailCid,
        description,
        unlockInfo: {
          type,
          contract: contractAddress,
          updateAuthority,
          mintAddress,
          network: network,
          blockchain,
          tokenId,
          tweetUrl,
          lat,
          long,
          distance,
        },
        customizations: fileInfo.customizations,
        submarineCid: cid,
      };

      const ky = getKy();
      await ky(`/api/metadata`, {
        method: edit ? "PUT" : "POST",
        body: JSON.stringify(submarinedContent),
        timeout: 2147483647,
      });

      setUploading(false);
      clearFields();
      setMessage({
        type: "success",
        message: "Created locked content!",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setMessage(null);
      }, 2500);
      router.push("/");
    } catch (error) {
      console.log({ error });
      setUploading(false);
      clearFields();
      setMessage({
        type: "error",
        message: "Trouble creating locked content...",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setMessage(null);
      }, 2500);
    }
  };

  const renderUnlockType = () => {
    switch (type) {
      case "retweet":
        return (
          <Twitter
            name={name}
            setName={setName}
            thumbnail={thumbnail}
            // setThumbnail={setThumbnail} // TODO?
            // setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            onFileChange={onFileChange}
            onThumbnailChange={onThumbnailChange}
            setDescription={setDescription}
            file={file}
            setFile={setFile}
            tweetUrl={tweetUrl}
            setTweetUrl={setTweetUrl}
            uploadingBackground={uploadingBackground}
            background={background}
            onBackgroundChange={onBackgroundChange}
            description={description}
            logoCid={logoCid}
            onLogoChange={onLogoChange}
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
            buttonTextColor={buttonTextColor}
            setButtonTextColor={setButtonTextColor}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            uploadingLogo={uploadingLogo}
            buttonShape={buttonShape}
            setButtonShape={setButtonShape}
          />
        );
      case "location":
        return (
          <Location
            name={name}
            setName={setName}
            thumbnail={thumbnail}
            // setThumbnail={setThumbnail} // TODO?
            // setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            description={description}
            setDescription={setDescription}
            onFileChange={onFileChange}
            onThumbnailChange={onThumbnailChange}
            lat={lat}
            long={long}
            setLat={setLat}
            setLong={setLong}
            distance={distance}
            setDistance={setDistance}
            setFile={setFile}
            file={file}
            uploadingBackground={uploadingBackground}
            backgroundCid={backgroundCid}
            background={background}
            onBackgroundChange={onBackgroundChange}
            logoCid={logoCid}
            onLogoChange={onLogoChange}
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
            buttonTextColor={buttonTextColor}
            setButtonTextColor={setButtonTextColor}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            uploadingLogo={uploadingLogo}
            logo={logo}
            buttonShape={buttonShape}
            setButtonShape={setButtonShape}
          />
        );
      case "nft":
      default:
        return (
          <NFT
            name={name}
            setName={setName}
            thumbnail={thumbnail}
            selectedFiles={selectedFiles}
            onFileChange={onFileChange}
            onThumbnailChange={onThumbnailChange}
            contractAddress={contractAddress}
            setContractAddress={setContractAddress}
            network={network}
            setNetwork={setNetwork}
            setDescription={setDescription}
            description={description}
            blockchainOptions={blockchainOptions}
            blockchain={blockchain}
            setBlockchain={setBlockchain}
            tokenId={tokenId}
            setTokenId={setTokenId}
            updateAuthority={updateAuthority}
            setUpdateAuthority={setUpdateAuthority}
            mintAddress={mintAddress}
            setMintAddress={setMintAddress}
            file={file}
            setFile={setFile}
            uploadingBackground={uploadingBackground}
            background={background}
            onBackgroundChange={onBackgroundChange}
            logoCid={logoCid}
            onLogoChange={onLogoChange}
            buttonColor={buttonColor}
            setButtonColor={setButtonColor}
            buttonTextColor={buttonTextColor}
            setButtonTextColor={setButtonTextColor}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            uploadingLogo={uploadingLogo}
            buttonShape={buttonShape}
            setButtonShape={setButtonShape}
          />
        );
    }
  };

  return (
    <Layout>
      <Alert showAlert={showAlert} type={message?.type} message={message?.message} />
      {uploading ? (
        <div className="w-3/4 m-auto text-center">
          <h3>Please wait</h3>
          <div className="w-full text-center flex justify-center items-center">
            <div className="text-center animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 m-auto mt-8"></div>
          </div>
        </div>
      ) : (
        <div className="w-11/12 m-auto mt-10">
          <PreviewModal
            previewOpen={previewOpen}
            setPreviewOpen={setPreviewOpen}
            fileInfo={fileInfo}
          />
          <div className="flex flex-row justify-between">
            <Link passHref href="/submarine/new">
              <div className="h-8 w-8 cursor-pointer">
                <ArrowLeftIcon />
              </div>
            </Link>
            <div className="block xl:hidden">
              <button
                onClick={() => setPreviewOpen(true)}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-pinata-purple"
              >
                Preview
              </button>
            </div>
          </div>
          <div className="xl:flex xl:flex-row xl:justify-between">
            <div className="xl:w-1/2">
              <form
                onSubmit={handleUploadAndLinkGeneration}
                className="mt-10 w-3/4 m-auto space-y-8 divide-y divide-gray-200"
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  {renderUnlockType()}
                </div>

                <div className="pt-5 pb-8">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!canSubmit() || uploading}
                      className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white ${
                        canSubmit() && "bg-pinata-purple"
                      } outline-none focus:outline-none`}
                    >
                      {uploading ? "Processing..." : "Upload and Continue"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="hidden xl:block xl:w-1/2">
              <div className="px-2">
                <Provider autoConnect connectors={connectors}>
                  <ContentLanding
                    missing={false}
                    loading={false}
                    fileInfo={fileInfo}
                    preview={true}
                  />
                </Provider>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UnlockType;
