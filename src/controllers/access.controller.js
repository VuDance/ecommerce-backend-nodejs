"use strict";

import { CREATED } from "../core/success.response.js";
import { AccessService } from "../services/access.service.js";

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Registered OK",
      metadata: await AccessService.SignUp(req.body),
    }).send(res);
  };
}
export const accessController = new AccessController();
