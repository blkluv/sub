import axios from "axios";

export const getUserSession = async (auth) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_PINATA_API_URL}/users/checkForSession`, {
      headers: {
        Authorization: auth,
        source: 'login'
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const createAPIKey = async (req) => {
  try {
    const newKeyResults = await axios.post(`${process.env.NEXT_PUBLIC_MANAGED_API}/auth/keys`,{}, {
        headers: {
          authorization: req.headers.authorization,
          source: 'login'
        }
      });
    return newKeyResults.data.key;
  } catch (error) {
    throw error;
  }
}

export const findAPIKeys = async (req) => {
  try {
    const hasKeyResults = await axios.get(`${process.env.NEXT_PUBLIC_MANAGED_API}/auth/keys?offset=0&limit=undefined`, {
      headers: {
        authorization: req.headers.authorization,
        source: 'login'
      }
    });
    return hasKeyResults.data.items;
  } catch (error) {
    throw error;
  }
}

export const getGateways = async (req) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_MANAGED_API}/gateways?page=1`, {
      headers: {
        authorization: req.headers.authorization,
        source: 'login'
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}