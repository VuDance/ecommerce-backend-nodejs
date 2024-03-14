import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

//init middleware
app.use(morgan("dev")); //log
app.use(helmet()); //security
app.use(compression()); //performance

//init db

//init routers
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome",
  });
});

export default app;
