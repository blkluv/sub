import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import NFT from "../../components/Submarine/SelectLockType/NFT";
import ky from "ky";
import Alert from "../../components/Alert";
import { useSubmarine } from "../../hooks/useSubmarine";
const short = require("short-uuid");

const UnlockType = () => {
  const networks = [
    { id: 1, name: 'ETH - Mainnet' },
    { id: 2, name: 'ETH - Ropsten' },
    { id: 3, name: 'ETH - Rinkeby' },
    { id: 4, name: 'Polygon - Mainnet' },
    { id: 5, name: 'Polygon - Mumbai' }
  ]

  const { handleUpload, getHeaders, uploadJSON } = useSubmarine();
  const router = useRouter();
  const { type } = router.query;
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tweetUrl, setTweetUrl] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [network, setNetwork] = useState(networks[0]);
  const [uploading, setUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [description, setDescription] = useState("");

  const onFileChange = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      Object.assign(files[i], {
        preview: URL.createObjectURL(files[i]),
        formattedSize: files[i].size,
      });
    }
    setSelectedFiles(files);
  };

  const onThumbnailChange = (e) => {
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      Object.assign(files[i], {
        preview: URL.createObjectURL(files[i]),
        formattedSize: files[i].size,
      });
    }
    setThumbnail(files);
  };

  const canSubmit = () => {
    switch (type) {
      case "nft":
        return selectedFiles.length > 0 && contractAddress && network;
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
        id: identifier,
        name: name, 
        thumbnail: "", 
        unlockType: type,
        tweetUrl,
        contractAddress,
        network,        
        cid: res.items[0].cid
      };

      await uploadJSON(submarinedContent, submarinedContent.id);

      const headers = await getHeaders();
      headers["content-type"] = "application/json";
      await ky(`/api/lock`, {
        method: "POST",
        headers: headers,
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
      console.log(error);
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
      case "nft":
        return (
          <NFT
          name={name}
          setName={setName}            
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          selectedFiles={selectedFiles}
          onFileChange={onFileChange}
          onThumbnailChange={onThumbnailChange}
          contractAddress={contractAddress}
          setContractAddress={setContractAddress}
          network={network}
          networks={networks}
          setNetwork={setNetwork}
          />
        );
      default:
        return (
          <NFT
            name={name}
            setName={setName}            
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            selectedFiles={selectedFiles}
            onFileChange={onFileChange}
            onThumbnailChange={onThumbnailChange}
            contractAddress={contractAddress}
            setContractAddress={setContractAddress}
            network={network}
            networks={networks}
            setNetwork={setNetwork}
          />
        );
    }
  };

  return (
    <div>
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

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!canSubmit() || uploading}
                className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  canSubmit() && "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
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
