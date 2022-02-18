import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';
import Head from 'next/head';
export default function Home() {
  const { fetchSession, isAuthenticated } = useAuth();
  useEffect(() => {
    fetchSession();
  }, []);
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      {
        isAuthenticated ?
        <Dashboard /> : 
        <Landing />
      }      
    </div>
  )
}
