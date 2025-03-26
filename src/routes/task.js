const express = require("express");
const router = express.Router();

const controller = require("../controllers/taskController");
const validateMongoId = require("../middleware/validateMongoId");
const validateMediaType = require("../middleware/validateMediaType");

router.route("/")
    .get(controller.getAll)
    .post(validateMediaType, controller.create)

router.route("/:id")
    .all(validateMongoId("id"))
    .get(controller.get)
    .put(validateMediaType, controller.update)
    .delete(controller.delete)

    module.exports = router;