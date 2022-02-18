import { makeDatePretty } from "../../pages/helpers/makePrettyDate"

export const mockData = () => {
  return [
    {
      id: 1,
      name: "The Zobmie Podcast", 
      description: "A podcast talking about all things zombie", 
      thumbnail: "QmX77GubjKdH7FofNko3m78Vd16Annd5GR5cM7VGXP2VPx",
      cid: "QmbtmBtCDemHRMNeEzJcRn3ACtfvQLje8gpJ3cttzAgbCQ", 
      lockInfo: {
        type: "NFT", 
        contract: "0xdb2448d266d311d35f56c46dd43884b7feeea76b", 
        network: "mainnet"
      }, 
      created: makeDatePretty("01/01/2022")
    }
  ]
}