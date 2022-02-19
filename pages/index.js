import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';
import Head from 'next/head';
export default function Home() {
  const { fetchSession, isAuthenticated, plan, confirmMFA, logUserIn } = useAuth();
  useEffect(() => {
    fetchSession();
  }, []);
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href="/submarine.png"></link>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Submarine Me - Unlock Exlusive Content With An NFT" />
        <meta property="og:type" content="Web application" />
        <meta property="og:title" content="Submarine Me" />
        <meta property="og:description" content="Submarine Me - Unlock Exlusive Content With An NFT" />
        <title>Submarine Me</title>
      </Head>
      {
        isAuthenticated ?
        <Dashboard plan={plan} /> : 
        <Landing logUserIn={logUserIn} confirmMFA={confirmMFA} />
      }      
    </div>
  )
}
