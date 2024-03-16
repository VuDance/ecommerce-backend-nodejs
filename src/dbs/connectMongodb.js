"use strict";

import mongoose from "mongoose";
import configMongodb from "../configs/config.mongodb.js";

console.log(configMongodb);
const connectString = `mongodb://${configMongodb.db.host}:${configMongodb.db.port}/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5`;

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(connectString)
      .then((_) => console.log("Connected to Mongo"))
      .catch((err) => console.log("Error connecting to Mongo", err));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
export const instanceMongodb = Database.getInstance();
