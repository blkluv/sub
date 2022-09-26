import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Alert from "../../Alert";
import ContentLanding from "../../Content/ContentLanding";
import PreviewModal from "../../Content/PreviewModal";
import Layout from "../../Layout";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import { Provider, chain, defaultChains } from "wagmi";
import { getKy } from "../../../helpers/ky";
import shortUUID from "short-uuid";
import { useAppSelector } from "../../../store/hooks";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { ContentWithUnlockInfo } from "../../../helpers/verify.helpers";
import { useRouter } from "next/router";
const infuraId = process.env.NEXTJS_PUBLIC_INFURA_ID;

const chains = defaultChains;

const SubmarineFileForm = ({ children, canSubmit, initialValues }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submarinedFile, setSubmarinedFile] = useState("");
  const gatewayUrl = useAppSelector(selectGatewayUrl);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const { type, edit } = router.query;
  useEffect(() => {
    if (router.query && edit) {
      //loadContent();
    }
  }, [router.query, edit]);
  const onSubmit = (
    values: ContentWithUnlockInfo,
    { setSubmitting }: FormikHelpers<ContentWithUnlockInfo>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      // handleUploadAndLinkGeneration();
    }, 500);
  };

  // const loadContent = async () => {
  //   setLoading(true);

  //   const ky = getKy();
  //   const res = await ky(`/api/content/${edit}`);
  //   setLoading(false);
  //   const json = await res.json();
  //   json.preview = true;
  //   setFileInfo(json);
  //   setUnlockInfo(json.unlockInfo);
  //   const { unlockInfo, description, customizations, id, name, shortId, submarineCID, thumbnail } =
  //     json;
  //   const {
  //     blockchain,
  //     contract,
  //     lat,
  //     long,
  //     distance,
  //     mintAddress,
  //     network,
  //     tokenId,
  //     tweetUrl,
  //     updateAuthority,
  //   } = unlockInfo;

  //   // setBlockchain(blockchain);
  //   // setContractAddress(contract);
  //   // setLat(lat);
  //   // setLong(long);
  //   // setDistance(distance);
  //   // setMintAddress(mintAddress);
  //   // setNetwork(network);
  //   // setTokenId(tokenId);
  //   // setTweetUrl(tweetUrl);
  //   // setUpdateAuthority(updateAuthority);
  //   // setBackgroundCid(customizations?.backgroundCid);
  //   // setLogoCid(customizations?.logoCid);
  //   // setFontFamily(customizations?.fontFamily);
  //   // setButtonColor(customizations?.buttonColor);
  //   // setButtonTextColor(customizations?.buttonTextColor);
  //   // setDescription(description);
  //   // setName(name);
  //   // setSubmarinedFile(submarineCID);
  //   // setThumbnail(thumbnail);
  //   // setThumbnailCid(thumbnail);
  // };

  // const handleUploadAndLinkGeneration = async () => {
  //   try {
  //     setUploading(true);
  //     let cid;
  //     const identifier = fileInfo?.shortId ? fileInfo?.shortId : shortUUID.generate();

  //     if (!submarinedFile && selectedFiles && selectedFiles.length > 0) {
  //       const data = new FormData();

  //       data.append("name", identifier);
  //       Array.from(selectedFiles).forEach((file) => {
  //         data.append("files", file);
  //       });
  //       data.append("pinToIPFS", "false");

  //       const ky = getKy();
  //       const res = await ky(`${process.env.NEXT_PUBLIC_MANAGED_API}/content`, {
  //         method: "POST",
  //         body: data,
  //         timeout: 2147483647,
  //       });

  //       const resJson = await res.json();
  //       cid = resJson.items[0].cid;
  //     } else {
  //       cid = submarinedFile;
  //     }
  //     const submarinedContent = {
  //       shortId: identifier,
  //       name,
  //       thumbnail: thumbnailCid,
  //       description,
  //       unlockInfo: {
  //         type,
  //         contract: contractAddress,
  //         updateAuthority,
  //         mintAddress,
  //         network: network,
  //         blockchain,
  //         tokenId,
  //         tweetUrl,
  //         lat,
  //         long,
  //         distance,
  //       },
  //       customizations: fileInfo.customizations,
  //       submarineCid: cid,
  //     };

  //     const ky = getKy();
  //     await ky(`/api/metadata`, {
  //       method: edit ? "PUT" : "POST",
  //       body: JSON.stringify(submarinedContent),
  //       timeout: 2147483647,
  //     });

  //     setUploading(false);
  //     clearFields();
  //     setMessage({
  //       type: "success",
  //       message: "Created locked content!",
  //     });
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //       setMessage(null);
  //     }, 2500);
  //     router.push("/");
  //   } catch (error) {
  //     console.log({ error });
  //     setUploading(false);
  //     clearFields();
  //     setMessage({
  //       type: "error",
  //       message: "Trouble creating locked content...",
  //     });
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //       setMessage(null);
  //     }, 2500);
  //   }
  // };
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
  const fileInfo = {};
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
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className="mt-10 w-3/4 m-auto space-y-8 divide-y divide-gray-200">
                  <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">{children}</div>

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
                </Form>
              </Formik>
            </div>

            <div className="hidden xl:block xl:w-1/2">
              <div className="px-2">
                <Provider autoConnect connectors={connectors}>
                  <ContentLanding
                    missing={false}
                    loading={false}
                    fileInfo={fileInfo}
                    gatewayUrl={gatewayUrl}
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

export default SubmarineFileForm;
