import mongoose from "mongoose";
import app from "./src/app.js";

const server = app.listen(3000, () => {
  console.log("port running");
});
process.on("SIGINT", () => {
  server.close(() => {
    console.log("server closed");
  });
  mongoose.connection.close(() => {
    console.log("Mongoose connection disconnected due to app termination");
    process.exit(0);
  });
});
