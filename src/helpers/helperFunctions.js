import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import jwt from "jsonwebtoken";

export const getJWTToken = (userid) => {
  const token = jwt.sign({ userid }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

  return token;
};

export const getAvatar = async(username) => {
  const avatar = createAvatar(lorelei, {
    seed: username,
  });

  const svg = await avatar.toDataUri();
  return svg;
};
