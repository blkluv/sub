import Head from 'next/head';
import React from 'react'
import Navigation from '../../components/Navigation'
import SharedHead from '../../components/SharedHead';
import SelectLockType from '../../components/Submarine/SelectLockType';

const SubmarineNew = () => {
  return (
    <div>
      <SharedHead />
      <Navigation />
      <div className="container w-full m-auto mt-10">        
        <SelectLockType />   
      </div>      
    </div>
  )
}

export default SubmarineNew;
