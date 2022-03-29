import Head from 'next/head';
import React from 'react'
import Navigation from '../../components/Navigation'
import SharedHead from '../../components/SharedHead';
import SelectLockType from '../../components/Submarine/SelectLockType';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/outline';

const SubmarineNew = () => {
  return (
    <div>
      <SharedHead />
      <Navigation />
      <div className="w-4/5 m-auto mt-10 mb-12">        
      <Link href="/">
          <div className="h-8 w-8 cursor-pointer mb-8">
            <ArrowLeftIcon />
          </div>
        </Link>
        <SelectLockType />   
      </div>      
    </div>
  )
}

export default SubmarineNew;
