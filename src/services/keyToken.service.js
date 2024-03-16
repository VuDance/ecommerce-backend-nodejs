"use strict";

import keyTokenModel from "../models/keyToken.model.js";

export class KeyTokenService {
  static createToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const token = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      console.log(token);
      return token ? token.publicKey : null;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}
