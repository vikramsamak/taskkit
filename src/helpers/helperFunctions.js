import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { SignJWT, jwtVerify } from "jose";
import { DEV_ENV, DEV_ENV_URL, PROD_ENV } from "./Constants";

if (process.env.SECRET_KEY) {
  var secretKey = Buffer.from(process.env.SECRET_KEY, "hex");
}
export const getJWTToken = async (userid) => {
  const token = await new SignJWT({
    id: userid,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setAudience(process.env.JWT_AUDIENCE)
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
    .sign(secretKey);

  return token;
};

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    });

    if (payload) {
      return payload;
    }
  } catch (e) {
    console.log(e);
    console.log("Token is invalid");
  }
};

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
