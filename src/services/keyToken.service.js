"use strict";

import keyTokenModel from "../models/keyToken.model.js";

export class KeyTokenService {
  static createToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // const publicKeyString = publicKey.toString();
      // const token = await keyTokenModel.create({
      //   user: userId,
      //   publicKey: publicKeyString,
      // });
      // return token ? token.publicKey : null;
      const filter = { user: userId },
        update = {
          publicKey,
          privateKey,
          refreshTokensUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true };
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
}
