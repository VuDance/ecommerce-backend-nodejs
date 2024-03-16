"use strict";

import mongoose from "mongoose";
import configMongodb from "../configs/config.mongodb.js";

const connectString = `mongodb://${configMongodb.db.db_username}:${configMongodb.db.db_password}@${configMongodb.db.host}:${configMongodb.db.port}`;

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(connectString, { dbName: configMongodb.db.DEV_DB_NAME })
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
