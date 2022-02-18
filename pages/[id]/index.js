import React, { useEffect } from 'react'
import ContentLanding from '../../components/Content/ContentLanding';
import { mockData } from '../../components/Dashboard/mockData'

const Content = () => {
  useEffect(() => {

  }, []);
  const pageData = mockData();
  return (
    <div>
      <ContentLanding pageData={pageData} />
    </div>
  )
}

export default Content