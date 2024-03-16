import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { checkOverLoad, countConnect } from "./helpers/checkConnect.js";
import { instanceMongodb } from "./dbs/connectMongodb.js";

const app = express();

//init middleware
app.use(morgan("dev")); //log
app.use(helmet()); //security
app.use(compression()); //performance

//init db
instanceMongodb;
countConnect();
checkOverLoad();

//init routers
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome",
  });
});

export default app;
