import { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import ky from "ky";
import { fetchSession } from "./useAuth";

export const uploadSubmarinedContent = async (data) => {
  const sessionData = await fetchSession();
  const { accessToken } = sessionData;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Source: "login",
  };

  const res = await ky(
    `${process.env.NEXT_PUBLIC_MANAGED_API}/content`,
    {
      method: "POST",
      headers: headers,
      body: data,
      timeout: 2147483647,
    }
  );

  const json = await res.json();
  return json;
};

export const useSubmarine = () => {
  const handleUpload = async (data) => {
    return await uploadSubmarinedContent(data);
  };

  const getSubmarineApiKey = async () => {
    const headers = await getHeaders();
    const res = await ky( `${process.env.NEXT_PUBLIC_MANAGED_API}/auth/keys`, {
      method: "GET",
      headers: {
        ...headers
      }
    }, );
    const json = await res.json();
    const { items } = json;
    if(items.length > 0) {
      return items[0].key
    } else {
      return null;
    }
  }

  const createSubmarineKey = async () => {
    const headers = await getHeaders();
    await ky( `${process.env.NEXT_PUBLIC_MANAGED_API}/auth/keys`, {
      method: "POST",
      headers: {
        ...headers
      }
    }, );
  }

  const submarineKey = async () => {
    let key = await getSubmarineApiKey();
    if(key) {
      return key;
    }

    await createSubmarineKey(); 
    key = await getSubmarineApiKey();
    return key;
  }

  const uploadJSON = async (json, id) => {
    try {
      const headers = await getHeaders();
      const payload = {
        "pinataMetadata": {
          "name": id
        },
        pinataContent: json
      }

      if(json) {
        payload.pinataMetadata.keyvalues = json
      }

      await ky(
        `${process.env.NEXT_PUBLIC_PINATA_API_URL}/pinning/pinJSONToIPFS`,
        {
          method: "POST",
          headers: {
            ...headers, 
            'content-type': 'application/json'
          },
          body: JSON.stringify(payload),
          timeout: 2147483647,
        },         
      );    
    } catch (error) {
      throw error;
    }
  }

  const getSubmarinedContent = async () => {
    const url = `${process.env.NEXT_PUBLIC_PINATA_API_URL}/data/pinList?status=pinned&metadata[keyvalues]={"submarineMe":{"value":"true","op":"eq"}}`
    const headers = await getHeaders();
    const res = await ky(
     url,
      {
        method: "GET",
        headers: {
          ...headers
        }
      },         
    );  
    const json = await res.json();
    return json?.rows || [];
  }

  const getLockMetadata = async (loadId) => {
    const meta = await ky(`https://opengateway.mypinata.cloud/ipfs/${loadId}`);
    const jsonMeta = await meta.json();
    return jsonMeta;
  }

  const getContent = async (jsonMeta) => {
    try {      
      const { id, cid } = jsonMeta;
      const url = `/api/lock?id=${id}&cid=${cid}`
      const headers = await getHeaders();
      const res = await ky(
        url,
        {
          method: "GET",
          headers: {
            ...headers
          }
        },         
    );  
    const json = await res.json();
    } catch (error) {
      throw error;
    }
  }

  const getHeaders = async () => {
    const sessionData = await fetchSession();
    const { accessToken } = sessionData;

    return {
      Authorization: `Bearer ${accessToken}`,
      Source: "login",
    };
  };
  return {
    handleUpload,
    getHeaders, 
    uploadJSON, 
    getSubmarinedContent, 
    getLockMetadata,
    getContent, 
    submarineKey
  };
};
