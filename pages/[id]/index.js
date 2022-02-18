import ky from 'ky';
import React, { useEffect } from 'react'
import ContentLanding from '../../components/Content/ContentLanding';
import { mockData } from '../../components/Dashboard/mockData'
import { useRouter } from "next/router";

const Content = () => {
  const router = useRouter()
  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { asPath } = router;
  
    const res = await ky(`/api/content${asPath}`, {
      method: "GET"
    })
  }

  const pageData = mockData();
  return (
    <div>
      <ContentLanding pageData={pageData} />
    </div>
  )
}

export default Content