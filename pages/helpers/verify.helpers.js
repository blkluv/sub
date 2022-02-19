import axios from "axios";
import models from '../../db/models/index' ;

// api will need to be updated to get specific gateways

export const getGateways = async (shortId) => {
  try {
    const contentWithUser = await models.content.findOne({
      where: {
        short_id: shortId
      },
      include: [
        {
          model: models.users
        }
      ]
    });
    const theAPIKey = contentWithUser.user.pinata_submarine_key;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_MANAGED_API}/gateways?page=1`, {
      headers: {
        'x-api-key': theAPIKey,
        'x-auth-token': theAPIKey
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}