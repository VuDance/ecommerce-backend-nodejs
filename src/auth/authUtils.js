"use strict";
import JWT from "jsonwebtoken";
import { asyncHandler } from "../helpers/asyncHandler";
import { AuthFailureError, NotFoundError } from "../core/error.response";
import { KeyTokenService } from "../services/keyToken.service";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  CLIENT_ID:'x-client-id'
};

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
const authentication=asyncHandler(async(req,res,next)=>{
  // check user Id is missing
  // get access token
  // verify token
  // check user in db
  // check key store with this user id
  // if ok, return next
  const userId=req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthFailureError('Invalid request')


  const keyStore=await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not found key store')

  const accessToken=req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthFailureError('Invalid request')

  try {
    const decodeUser=JWT.verify(accessToken,keyStore.publicKey)
    if(userId !== decodeUser.userId){
      throw new AuthFailureError('Invalid UserId')
    }
    req.keyStore=keyStore
    return next()
  } catch (error) {
    throw error
  }

})
export { createTokenPair ,authentication};
