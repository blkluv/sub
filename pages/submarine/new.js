import React from 'react'
import Navigation from '../../components/Navigation'
import SelectLockType from '../../components/Submarine/SelectLockType';

const SubmarineNew = () => {
  return (
    <div>
      <Navigation />
      <div className="container w-full m-auto mt-10">        
        <SelectLockType />   
      </div>      
    </div>
  )
}

export default SubmarineNew;
