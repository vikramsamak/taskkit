import jwt from "jsonwebtoken";

export const getJWTToken = (userid) => {
  const token = jwt.sign({ userid }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

  return token;
};
