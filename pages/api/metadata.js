//  THIS FILE IS WHERE WE WILL POST THE METADATA ASSOCIATED WITH A USER'S SUBMARINED CONTENT: 
//  * Name
//  * Description 
//  * Thumbnail CID
//  * Unlock info
//  * Customer API Key

export default handler(async (req, res) => {
  if(req.method === "POST") {
    try {    
      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }    
  } else if(req.method === "GET") {
    try {
      
    } catch (error) {
      console.log(error);
      const { response: fetchResponse } = error
      res.status(fetchResponse?.status || 500).json(error.data)
    }
  } else {
    res.status(200).json({ message: 'This is the way...wait, no it is not. What are you doing here?' })
  }
})