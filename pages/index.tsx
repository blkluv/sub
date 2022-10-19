import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";
import { useEffect } from 'react';
import * as FullStory from '@fullstory/browser'

export default function Home() {
  useEffect(() => {
    FullStory.init({ orgId: process.env.NEXT_PUBLIC_FS_ORG_ID as string}, ({ sessionUrl }) => console.log(`Started session: ${sessionUrl}`));;
  }, []);
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}
