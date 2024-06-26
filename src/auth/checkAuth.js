"use strict";

import { findById } from "../services/apiKey.service.js";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.json({
        message: "Forbidden Error",
      });
    }
    //check object key
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {}
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }
    const validPermissions = req.objKey.permissions.includes(permission);
    if (!validPermissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }
    return next();
  };
};


export { apiKey, permission };
