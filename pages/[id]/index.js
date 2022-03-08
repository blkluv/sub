import ky from "ky";
import React, { useEffect, useState } from "react";
import ContentLanding from "../../components/Content/ContentLanding";
import { mockData } from "../../components/Dashboard/mockData";
import { useRouter } from "next/router";
import Head from "next/head";

const Content = () => {
  const [fileInfo, setFileInfo] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    fetchContent();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (fileInfo) {
      setLoading(false);
    }
  }, [fileInfo]);

  const fetchContent = async () => {        
    const res = await ky(`/api/content${window.location.pathname}`, {
      method: "GET",
    });
    const json = await res.json();
    setFileInfo(json);
  };

  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href={fileInfo && fileInfo.thumbnail ? `https://opengateway.mypinata.cloud/ipfs/${fileInfo?.thumbnail}` : "/submarine.png"}></link>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content={fileInfo?.description}
        />
        <meta property="og:type" content="Web application" />
        <meta property="og:title" content={fileInfo && fileInfo.name ? fileInfo?.name : "Submarine Me"} />
        <meta
          property="og:description"
          content={fileInfo && fileInfo.name ? fileInfo?.description : "Locked content powered by Pinata's Submarine Me"}
        />
        <meta property="og:image" content={fileInfo && fileInfo.thimbnail ? `https://opengateway.mypinata.cloud/ipfs/${fileInfo?.thumbnail}` : "https://gateway.submarine.me/ipfs/QmWzia1qwTKT4SdRw3923uxkyT8trBLim75bNKfxtoLzwR?filename=submarine_preview.png"} />
        <title>{fileInfo && fileInfo.name ? fileInfo.name : "Submarine Me - By Pinata"}</title>
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
      <ContentLanding
        loading={loading}
        fileInfo={fileInfo}
      />
    </div>
  );
};

export default Content;
