import ky from 'ky';
import React, { useEffect, useState } from 'react'
import ContentLanding from '../../components/Content/ContentLanding';
import { mockData } from '../../components/Dashboard/mockData'
import { useRouter } from "next/router";

const Content = () => {
  const [fileInfo, setFileInfo] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter()
  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if(fileInfo) {
      setLoading(false);
    }
  }, [fileInfo]);

  const fetchContent = async () => {
    const { asPath } = router;
    console.log(window.location.pathname)
    console.log(`/api/content${asPath}`);
    const res = await ky(`/api/content${window.location.pathname}`, {
      method: "GET"
    });
    const json = await res.json();
    setFileInfo(json);    
  }

  const pageData = mockData();
  return (
    <div>
      <ContentLanding pageData={pageData} loading={loading} fileInfo={fileInfo} />
    </div>
  )
}

export default Content