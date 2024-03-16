"use strict";
import JWT from "jsonwebtoken";

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: 3600,
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: 3600,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return {
      Error: error,
    };
  }
};

export { createTokenPair };
