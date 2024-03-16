"use strict";

import mongoose from "mongoose";

const SECOND = 5000;

export const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(numConnections);
};

export const checkOverLoad = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const memoryUsage = process.memoryUsage().rss;
    console.log(numConnections, memoryUsage);
  }, SECOND);
};
