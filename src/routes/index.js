"use strict";

import express from "express";
const router = express.Router();
import { SignUpRouter } from "./access/index.js";
import { apiKey, permission } from "../auth/checkAuth.js";

router.use(apiKey);
router.use(permission("0000"));
router.use("/v1/api", SignUpRouter);
// router.get("", (req, res) => {
//   return res.status(200).json({
//     message: "Welcome",
//   });
// });
export default router;
