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
import Head from "next/head";
const short = require("short-uuid");

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
  const [network, setNetwork] = useState(networks[0]);
  const [uploading, setUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState([]);
  const [description, setDescription] = useState("");
  const [thumbnailCid, setThumbnailCid] = useState("");

  const onFileChange = (e, type) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
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

    const { accessToken }  = await fetchSession();
    const data = new FormData();
    data.append("file", files[0], files[0].name)
    const res = await axios.post(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/pinning/pinFileToIPFS`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`, 
        Source: 'login'
      }
    });

    setThumbnailCid(res.data.IpfsHash);
  };

  const canSubmit = () => {
    switch (type) {
      case "nft":
        return selectedFiles.length > 0 && contractAddress && network && name && description;
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
          network: network.name
        },         
        submarineCid: res.items[0].cid
      };

      const headers = await getHeaders();

      // //  @TODO POST TO MATT's API
      await ky(`/api/metadata`, {
        method: "POST",
        headers: {
          ...headers, 
          "content-type": "application/json"
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
            setSelectedFiles={setSelectedFiles}
            onFileChange={onFileChange}
            onThumbnailChange={onThumbnailChange}
            contractAddress={contractAddress}
            setContractAddress={setContractAddress}
            network={network}
            networks={networks}
            setNetwork={setNetwork}
            description={description}
            setDescription={setDescription}
          />
        );
    }
  };

  return (
    <div>
      <Head>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/submarine.png"></link>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Submarine Me - Unlock Exlusive Content With An NFT"
        />
        <meta property="og:type" content="Web application" />
        <meta property="og:title" content="Submarine Me" />
        <meta
          property="og:description"
          content="Submarine Me - Unlock Exlusive Content With An NFT"
        />
        <title>Submarine Me</title>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LDJ4RPGPGE"></script>
        <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-LDJ4RPGPGE');`
        }} />  
      <script
          dangerouslySetInnerHTML={{
            __html: `
window['_fs_debug'] = false;
window['_fs_host'] = 'fullstory.com';
window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
window['_fs_org'] = '17GRP9';
window['_fs_namespace'] = 'FS';
(function(m,n,e,t,l,o,g,y){
    if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
    g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
    o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
    y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
    g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
    g.anonymize=function(){g.identify(!!0)};
    g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
    g.log = function(a,b){g("log",[a,b])};
    g.consent=function(a){g("consent",!arguments.length||a)};
    g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
    g.clearUserCookie=function(){};
    g.setVars=function(n, p){g('setVars',[n,p]);};
    g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
    if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
    g._v="1.3.0";
})(window,document,window['_fs_namespace'],'script','user');
              `,
          }}
        />
      </Head>
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
