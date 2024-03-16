"use strict";

import { AccessService } from "../services/access.service.js";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log(req.body);
      //200 ok
      //201 Created
      return res.status(201).json(await AccessService.SignUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}
export const accessController = new AccessController();
