"use strict";

import { CREATED, SuccessResponse } from "../core/success.response.js";
import { AccessService } from "../services/access.service.js";

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res);
  };
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Registered OK",
      metadata: await AccessService.SignUp(req.body),
    }).send(res);
  };
  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout success",
      metadata: await AccessService.Logout(req.keyStore),
    }).send(res);
  };
}
export const accessController = new AccessController();
