const express = require("express");
const server = express();

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (_, res) => {
  res.send(`<h1>Working!</h1>`);
});
// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
