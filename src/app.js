import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { countConnect } from "./helpers/checkConnect.js";
import { instanceMongodb } from "./dbs/connectMongodb.js";
import router from "./routes/index.js";
import "dotenv/config.js";

const app = express();

//init middleware
app.use(morgan("dev")); //log
app.use(helmet()); //security
app.use(compression()); //performance
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

//init db
instanceMongodb;
countConnect();
// checkOverLoad();

//init routers
app.use("/", router);

//handling errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

export default app;
