import jwt from "jsonwebtoken";
const PRIVATE_KEY = process.env.CANNY_SECRET;
import { getUserSession } from "../../../helpers/user.helpers";

export default async function handler(req, res) {
  console.log({ bod: req.body });
  const user = await getUserSession(req);
  const { name } = req.body;

  if (!user) {
    res.status(401).send("Unauthorized");
  }
  try {
    const userData = {
      email: user.userInformation.email,
      id: user.userInformation.id,
      name: name,
    };
    const token = jwt.sign(userData, PRIVATE_KEY, { algorithm: "HS256" });
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json("Error creating jwt token");
  }
}
