import { useMetamask } from "../../hooks/useMetamask"
import PinnieYellowSvg from "../PinnieYellowSvg";
import SubmarineLogoSvg from "../SubmarineLogoSvg";

export default function ContentLanding({ pageData }) {
  const { signData } = useMetamask();

  return (
    <div className="public-content-bg h-screen w-screen flex flex-col justify-center align-center">
       <div className="p-10 md:w-1/2 w-3/4 h-auto text-center flex flex-col justify-center align-center m-auto bg-white overflow-hidden shadow-lg rounded-lg">
        <img className="mb-8 mt-6 w-24 h-24 m-auto rounded-full" src={`https://opengateway.mypinata.cloud/ipfs/${pageData[0].thumbnail}?img-width=200&img-height=200`} alt={`${pageData[0].name} preview`} />
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">{pageData[0].name}</span>      
        </h2>
        <h4 className="mt-4 text-muted text-xl">{pageData[0].description}</h4>        
        <div className="mt-10 flex justify-center">
          <div className="inline-flex w-1/2">
            <button
              onClick={() => signData(pageData[0].network)}              
              className="w-full inline-flex shadow-sm items-center justify-center px-5 py-3 text-base font-medium rounded-full text-white bg-pinata-purple hover:bg-pinata-purple"
            >
              Connect wallet
            </button>
          </div>             
        </div>
        <p className="mt-4 mb-4 text-md text-muted">Unlock this content by connecting your wallet to verify you have the required NFT.</p>      
       </div>
       <div className="p-4 flex flex-row">
         <div>
          <SubmarineLogoSvg />
         </div>        
         <div className="ml-8 -mt-2">
          <PinnieYellowSvg />
         </div>        
       </div>
    </div>
  )
}