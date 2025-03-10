const express = require("express");
const router = express.Router();

const controller = require("../controllers/tasksController")

router.route("/")
    .get(controller.getAll)
    .post(controller.create)

router.route("/:id")
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete)

    module.exports = router;