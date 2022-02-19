import models from '../../../db/models/index' ;

export default async function handler(req, res) {
  try {
    if(!req.query.shortId) {
      res.status(401).send("Please provide a shortId");
    }
    console.log({id: req.query.shortId});
    const theContent = await models.content.findOne({
      where: {
        short_id: req.query.shortId
      }
    })
    const returnObject = {
      id: theContent.id,
      name: theContent.name,
      description: theContent.description,
      thumbnail: theContent.thumbnail,
      submarineCID: theContent.submarine_cid,
      unlockInfo: theContent.unlock_info,
      shortId: theContent.short_id
    }
    
    res.status(200).json(returnObject);
  } catch (error) {
    console.log(error);
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
}
