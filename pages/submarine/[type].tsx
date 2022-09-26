import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import Alert from "../../components/Alert";
import Twitter from "../../components/Submarine/SelectLockType/Twitter";
import ContentLanding from "../../components/Content/ContentLanding";
import PreviewModal from "../../components/Content/PreviewModal";
import { getKy } from "../../helpers/ky";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../store/hooks";
import { selectGatewayUrl } from "../../store/selectors/authSelectors";

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
};

export default UnlockType;
