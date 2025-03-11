const express = require("express");

const TaskRouter = require("./tasks");

const router = express.Router();

router.use("/tasks", TaskRouter);

module.exports = router;