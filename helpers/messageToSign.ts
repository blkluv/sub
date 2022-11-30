export const getMessagetoSign = (contract, id) => {
  const fullMessage = `To verify you own the NFT in question, 
    you must sign this message. 
    The NFT contract address is:
    ${contract}
    The verification id is: 
    ${id}`;
  return fullMessage;
};
