"use strict";

import shopModel from "../models/shop.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { KeyTokenService } from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";
import { AuthFailureError, BadRequestError } from "../core/error.response.js";
import { findByEmail } from "./shop.service.js";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

export class AccessService {
  static SignUp = async ({ name, email, password }) => {
    const isExistedEmail = await shopModel.findOne({ email: email }).lean();

    if (isExistedEmail) {
      throw new BadRequestError("Error: Account already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await shopModel.create({
      name,
      email,
      password: hashedPassword,
      roles: RoleShop["SHOP"],
    });
    if (newUser) {
      const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });

      const publicKeyString = await KeyTokenService.createToken({
        userId: newUser._id,
        publicKey,
      });
      if (!publicKeyString) {
        throw new BadRequestError("Error: Key Error");
      }
      const publickeyObject = crypto.createPublicKey(publicKeyString);
      const token = await createTokenPair(
        { userId: newUser._id, email },
        publickeyObject,
        privateKey
      );
      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fields: ["_id", "name", "email"],
            object: newUser,
          }),
          token,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };
  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError("Shop not found");
    }
    const match = await bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication failed");

    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });
    const publicKeyString = await KeyTokenService.createToken({
      userId: foundShop._id,
      publicKey,
    });
    if (!publicKeyString) {
      throw new BadRequestError("Error: Key Error");
    }
    const publickeyObject = crypto.createPublicKey(publicKeyString);
    const token = await createTokenPair(
      { userId: foundShop._id, email },
      publickeyObject,
      privateKey
    );
    await KeyTokenService.createToken({
      userId: foundShop._id,
      refreshToken: token.refreshToken,
      privateKey,
      publicKey,
    });
    return {
      metadata: {
        shop: getInfoData({
          fields: ["_id", "name", "email"],
          object: foundShop,
        }),
        token,
      },
    };
  };
}
