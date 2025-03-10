const express = require("express");

const TasksRouter = require("./tasks");

const router = express.Router();

router.use("/tasks", TasksRouter);

module.exports = router;