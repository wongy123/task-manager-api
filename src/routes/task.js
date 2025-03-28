const express = require("express");
const router = express.Router();

const controller = require("../controllers/taskController");
const validateMongoId = require("../middleware/validateMongoId");
const validateMediaType = require("../middleware/validateMediaType");
const validatePaginateQueryParams = require("../middleware/validatePaginateQueryParams");
const authenicateWithJwt = require("../middleware/authenticateWithJwt");

router.route("/")
    .all(authenicateWithJwt)
    .get(validatePaginateQueryParams, controller.getAll)
    .post(validateMediaType, controller.create)

router.route("/:id")
    .all(validateMongoId("id"))
    .get(controller.get)


router.route("/:id")
    .all(authenicateWithJwt)
    .all(validateMongoId("id"))
    .put(validateMediaType, controller.update)
    .delete(controller.delete)

module.exports = router;