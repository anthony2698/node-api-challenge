const express = require("express");

const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter");

const server = express();

server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
    res.status(200).json({ API: "Running..." });
});

module.exports = server;