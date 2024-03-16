"use strict";

import shopModel from "../models/shop.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { KeyTokenService } from "./keyToken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import { getInfoData } from "../utils/index.js";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

export class AccessService {
  static SignUp = async ({ name, email, password }) => {
    try {
      const isExistedEmail = await shopModel.findOne({ email: email }).lean();
      if (isExistedEmail) {
        return {
          code: "xxxx",
          message: "Your account already exists",
        };
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
          return {
            code: "xxxxx",
            message: "Key Error",
          };
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
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "Error",
      };
    }
  };
}
