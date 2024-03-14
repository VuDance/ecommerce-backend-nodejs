import app from "./src/app.js";

const server = app.listen(3000, () => {
  console.log("port running");
});
process.on("SIGINT", () => {
  server.close(() => {
    console.log("server closed");
  });
});
