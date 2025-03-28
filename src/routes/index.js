const express = require("express");


const AuthenticationRouter = require("./auth");
const TaskRouter = require("./task");

const router = express.Router();

router.use("/tasks", TaskRouter);
router.use("/auth", AuthenticationRouter);

module.exports = router;