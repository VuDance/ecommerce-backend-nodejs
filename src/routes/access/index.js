"use strict";

import express from "express";
import { accessController } from "../../controllers/access.controller.js";
import { asyncHandler } from "../../auth/checkAuth.js";
import { authentication } from "../../auth/authUtils.js";
const router = express.Router();

router.post("/shop/signup", asyncHandler(accessController.signUp));
router.post("/shop/login", asyncHandler(accessController.login));

//authentication
router.use(authentication);

router.post("shop/logout", asyncHandler(accessController.logout));

export { router as SignUpRouter };
