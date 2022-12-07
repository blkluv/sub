 
// This is a wallet check for token ids
pub fun main(account: Address, contractName: Structure, tokenIds: [UInt64]): [UInt64]{
 
 // Get both public account objects
 let account = getAccount(account);
 
 // Find the public Receiver capability for their Collection
 let acctCapability = account.getCapability(contractName.CollectionPublicPath)!
 
 // borrow reference from the capabilities
 let receiverRef = acctCapability.borrow<&{contractName.ContractNameCollectionPublic}>()
     ?? panic("Could not borrow account receiver reference")
 
 let ownedTokens:[UInt64] = []

for element in tokenIds {
     if(receiverRef.borrow_contractName(id:element) != nil) {
       ownedTokens.append(element)
     }
 }
 
 // return a list of only the owned tokens
 return ownedTokens
}
 