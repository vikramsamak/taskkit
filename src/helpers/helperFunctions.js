import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { DEV_ENV, DEV_ENV_URL, PROD_ENV } from "./Constants";
import { getToken } from "next-auth/jwt";

export const getAvatar = async (username) => {
  const avatar = createAvatar(lorelei, {
    seed: username,
  });

  const svg = await avatar.toDataUri();
  return svg;
};

export const getBaseURl = () => {
  let baseUrl = "";
  if (process.env.NODE_ENV === DEV_ENV) {
    baseUrl = DEV_ENV_URL;
  } else if (process.env.NODE_ENV === PROD_ENV) {
    baseUrl = "";
  }
  return baseUrl;
};

export async function getUserDetailsFromToken(req) {
  const token = await getToken({ req });
  const { fullName, avatarUrl, id } = token;
  return { fullName, avatarUrl, id };
}
