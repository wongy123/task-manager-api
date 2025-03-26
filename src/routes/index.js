const express = require("express");

const TaskRouter = require("./task");

const router = express.Router();

router.use("/tasks", TaskRouter);

module.exports = router;