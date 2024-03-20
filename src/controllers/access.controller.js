"use strict";

import { AccessService } from "../services/access.service.js";

class AccessController {
  signUp = async (req, res, next) => {
    return res.status(201).json(await AccessService.SignUp(req.body));
  };
}
export const accessController = new AccessController();
