import ky from "ky";
import React, { useEffect, useState } from "react";
import ContentLanding from "../../components/Content/ContentLanding";
import { mockData } from "../../components/Dashboard/mockData";
import { useRouter } from "next/router";
import Head from "next/head";

import { Provider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

const infuraId = "80f214d8bfdb44a8a95217f902393d6d"; //process.env.NEXTJS_PUBLIC_INFURA_ID;

const chains = defaultChains;

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
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

const Content = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [missing, set404] = useState(false);
  const [gatewayUrl, setGatewayUrl] = useState("");
  useEffect(() => {
    setGatewayUrl(localStorage.getItem("sm-gateway"))
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }

    if (data && data.error) {
      set404(true);
    }
  }, [data]);

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="icon"
          href={
            data && data.thumbnail
              ? `${gatewayUrl}/ipfs/${data?.thumbnail}`
              : "/submarine.png"
          }
        ></link>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={data?.description} />
        <meta property="og:type" content="Web application" />
        <meta
          property="og:title"
          content={data && data.name ? data?.name : "Submarine.me"}
        />
        <meta
          property="og:description"
          content={
            data && data.name
              ? data?.description
              : "Locked content powered by Submarine.me"
          }
        />
        <meta
          property="og:image"
          content={
            data && data.thumbnail
              ? `${gatewayUrl}/ipfs/${data?.thumbnail}`
              : "https://ipfs.submarine.me/ipfs/QmWzia1qwTKT4SdRw3923uxkyT8trBLim75bNKfxtoLzwR?filename=submarine_preview.png"
          }
        />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-LDJ4RPGPGE');`,
          }}
        />
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
      <Provider autoConnect connectors={connectors}>
        <ContentLanding missing={missing} loading={loading} fileInfo={data} />
      </Provider>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const host =
      process.env.NODE_ENV === "production"
        ? "https://app.submarine.me"
        : "http://localhost:3001";

    const res = await ky(`${host}/api/content/${context.query.id}`, {
      method: "GET",
    });
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return { props: { data: { error: true } } };
  }
}

export default Content;
