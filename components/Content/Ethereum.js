import React from 'react'
import MainLandingContent from './MainLandingContent'

const Ethereum = ({ signing, loading, handleSign, fileInfo }) => {
  return (
    <div>
      <MainLandingContent fileInfo={fileInfo} loading={loading} signing={signing} handleSign={handleSign} />
    </div>
  )
}

export default Ethereum