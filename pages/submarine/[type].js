import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import ky from "ky";
import Alert from "../../components/Alert";
import { useSubmarine } from "../../hooks/useSubmarine";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import SharedHead from "../../components/SharedHead";
import Twitter from "../../components/Submarine/SelectLockType/Twitter";
import Location from "../../components/Submarine/SelectLockType/Location";
const short = require("short-uuid");

const blockchainOptions = ["Ethereum", "Polygon", "Avalanche", "Solana"];

const UnlockType = () => {
  const networks = [
    { id: 1, name: "ETH - Mainnet" },
    { id: 3, name: "ETH - Rinkeby" },
    { id: 4, name: "Polygon - Mainnet" },
    { id: 5, name: "Polygon - Mumbai" },
  ];

  const { handleUpload, submarineKey, getHeaders, uploadJSON } = useSubmarine();
  const { fetchSession, loggedInUser } = useAuth();
  const router = useRouter();
  const { type } = router.query;
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
  const [description, setDescription] = useState("");
  const [thumbnailCid, setThumbnailCid] = useState("");
  const [file, setFile] = useState(true);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [distance, setDistance] = useState(0);

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

    const { accessToken } = await fetchSession();
    const data = new FormData();
    data.append("file", files[0], files[0].name);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PINATA_API_URL}/pinning/pinFileToIPFS`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Source: "login",
        },
      }
    );

    setThumbnailCid(res.data.IpfsHash);
  };

  const canSubmit = () => {
    switch (type) {
      case "retweet":
        return tweetUrl.length > 5;
      case "nft":
        return (
          selectedFiles.length > 0 &&
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
      const data = new FormData();

      const identifier = short.generate();

      data.append("name", identifier);
      Array.from(selectedFiles).forEach((file) => {
        data.append("files", file);
      });
      data.append("pinToIPFS", false);

      const res = await handleUpload(data);

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
          distance
        },
        submarineCid: res.items[0].cid,
      };

      const headers = await getHeaders();

      await ky(`/api/metadata`, {
        method: "POST",
        headers: {
          ...headers,
          "content-type": "application/json",
        },
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
            setThumbnail={setThumbnail}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            onFileChange={onFileChange}
            onThumbnailChange={onThumbnailChange}
            setDescription={setDescription}
            file={file}
            setFile={setFile}
            tweetUrl={tweetUrl}
            setTweetUrl={setTweetUrl}
          />
        );
      case "location":
        return (
          <Location
            name={name}
            setName={setName}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            setSelectedFiles={setSelectedFiles}
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
          />
        );
      case "nft":
      default:
        return (
          <NFT
            name={name}
            setName={setName}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            onFileChange={onFileChange}
            onThumbnailChange={onThumbnailChange}
            contractAddress={contractAddress}
            setContractAddress={setContractAddress}
            network={network}
            networks={networks}
            setNetwork={setNetwork}
            setDescription={setDescription}
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
          />
        );
    }
  };

  return (
    <div>
      <SharedHead />
      <Navigation />
      <Alert
        showAlert={showAlert}
        type={message?.type}
        message={message?.message}
      />
      <div className="w-4/5 m-auto mt-10">
        <Link href="/submarine/new">
          <div className="h-8 w-8 cursor-pointer">
            <ArrowLeftIcon />
          </div>
        </Link>

        <form
          onSubmit={handleUploadAndLinkGeneration}
          className="mt-10 w-3/4 m-auto space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            {uploading ? (
              <div className="w-3/4 m-auto text-center">
                <h3>Please wait</h3>
                <div className="w-full text-center flex justify-center items-center">
                  <div className="text-center animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 m-auto mt-8"></div>
                </div>
              </div>
            ) : (
              renderUnlockType()
            )}
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
    </div>
  );
};

export default UnlockType;
