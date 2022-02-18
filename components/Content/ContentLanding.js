import { useMetamask } from "../../hooks/useMetamask"

export default function ContentLanding({ pageData }) {
  const { signData } = useMetamask();

  return (
    <div className="bg-white mt-20">
      <div className="flex flex-col w-3/4 max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 justify-center align-center">

          <img className="mb-8 w-24 h-24 m-auto rounded-full" src={`https://opengateway.mypinata.cloud/ipfs/${pageData[0].thumbnail}?img-width=200&img-height=200`} alt={`${pageData[0].name} preview`} />

        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to unlock <mark className="p-1 color">{pageData[0].name}</mark>?</span>      
        </h2>
        <h3 className="mt-4 text-2xl font-bold">{pageData[0].description}</h3>
        <p className="mt-4 text-lg">Connect your wallet to prove you have the required NFT.</p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={signData}              
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Connect
            </button>
          </div>         
        </div>
      </div>
    </div>
  )
}