import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import ContentLanding from "../../Content/ContentLanding";
import PreviewModal from "../../Content/PreviewModal";
import Layout from "../../Layout";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";
import { Provider, chain, defaultChains } from "wagmi";
import { getKy } from "../../../helpers/ky";
import shortUUID from "short-uuid";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { Formik, Form, FormikHelpers } from "formik";
import { Customizations, UnlockInfo } from "../../../types/UnlockInfo";
import { useRouter } from "next/router";
import { setAlert } from "../../../store/slices/alertSlice";
const infuraId = process.env.NEXTJS_PUBLIC_INFURA_ID;

const chains = defaultChains;

interface SubmarineProps {
  children: ReactNode;
  unlockInfo: UnlockInfo;
  canSubmit: (values: MetadataUnlockInfo) => boolean;
}

export interface MetadataUnlockInfo {
  name: string;
  description: string;
  unlockInfo: UnlockInfo;
  thumbnail?:
    | string
    | {
        preview: string;
      }[];
  customizations: Customizations;
  submarineCID: string;
  shortId: string;
}

const SubmarineFileForm = ({ children, canSubmit, unlockInfo }: SubmarineProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  const baseInitialValues = {
    name: "",
    description: "",
    thumbnail: "",
    customizations: {},
    submarineCID: "",
    shortId: "",
  };
  const [initialValues, setInitialValues] = useState<MetadataUnlockInfo>({
    unlockInfo,
    ...baseInitialValues,
  });

  const { edit } = router.query;
  useEffect(() => {
    if (router.query && edit) {
      const ky = getKy();
      ky(`/api/content/${edit}`).then((res) =>
        res.json().then((json) => {
          setInitialValues({ ...json, selectedFiles: [] });
        })
      );
    }
  }, [router.query, edit]);
  const onSubmit = async (
    values: MetadataUnlockInfo,
    { setSubmitting }: FormikHelpers<MetadataUnlockInfo>
  ) => {
    setSubmitting(true);
    const identifier = values.shortId ? values.shortId : shortUUID.generate();

    const submarinedContent: MetadataUnlockInfo = {
      shortId: identifier,
      ...values,
    };

    const ky = getKy();
    await ky(`/api/metadata`, {
      method: edit ? "PUT" : "POST",
      body: JSON.stringify(submarinedContent),
      timeout: false,
    })
      .then(() => {
        router.push("/");
        dispatch(
          setAlert({
            type: "success",
            message: "Created locked content!",
          })
        );
      })
      .catch(() => {
        dispatch(
          setAlert({
            type: "error",
            message: "Failed to create locked content!",
          })
        );
      });
    setSubmitting(false);
  };

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

  return (
    <Layout>
      <Formik initialValues={initialValues} enableReinitialize onSubmit={onSubmit}>
        {(props) =>
          props.isSubmitting ? (
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
                fileInfo={props.values}
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
                  <Form className="mt-10 w-3/4 m-auto space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                      {children}
                    </div>
                    <div className="pt-5 pb-8">
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={!canSubmit(props.values) || props.isSubmitting}
                          className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white ${
                            canSubmit(props.values) && "bg-pinata-purple"
                          } outline-none focus:outline-none`}
                        >
                          {props.isSubmitting ? "Processing..." : "Upload and Continue"}
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>

                <div className="hidden xl:block xl:w-1/2">
                  <div className="px-2">
                    <Provider autoConnect connectors={connectors}>
                      <ContentLanding
                        missing={false}
                        loading={false}
                        fileInfo={props.values}
                        gatewayUrl={gatewayUrl}
                      />
                    </Provider>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </Formik>
    </Layout>
  );
};

export default SubmarineFileForm;
