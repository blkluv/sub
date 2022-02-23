import axios from "axios";
import models from '../db/models/index' ;

// api will need to be updated to get specific gateways

export const getUserContentCombo = async (shortId) => {
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
    return contentWithUser;
  } catch (error) {
    throw error;
  }
}