import React from 'react'
import Twitter from './Twitter';

const LockTypePage = ({ meta }) => {
  const renderLockPage = () => {
    if(meta) {
      const { unlockType } = meta;
      if(unlockType) {
        switch(unlockType) {
          case "retweet": 
            return <Twitter meta={meta} />
          case "nft": 
            return <div />
          default: 
            return <div />
        }
      }
    }    

    return <div />
  }
  return (
    <div>
      {renderLockPage()}
    </div>
  )
}

export default LockTypePage
