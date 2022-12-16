import { getUserContentCombo } from "../../../../repositories/content";
import axios from "axios";

export default async function handler(req, res): Promise<string> {
  console.log({ req: req.body });
  const { itemId, shortId } = req.body;
  try {
    const info = await getUserContentCombo(shortId);
    const { Users } = info;
    const { pinata_submarine_key } = Users;
    const config = {
      headers: {
        "x-api-key": `${pinata_submarine_key}`,
        "Content-Type": "application/json",
      },
    };
    const content = await axios.get(
      `${process.env.NEXT_PUBLIC_MANAGED_API}/content/${itemId}/streamURL`,
      config
    );
    const { data } = content;
    console.log(data);
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(401).send("There was an issue.");
  }
}
