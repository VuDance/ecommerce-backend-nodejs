"use strict";

import apiKeyModel from "../models/apiKey.model.js";

const findById = async (key) => {
  const obj = await apiKeyModel.findOne({ key, status: true }).lean();
  return obj;
};
export { findById };
