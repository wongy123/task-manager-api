const express = require("express");
const controller = require("../controllers/authController");
const validateMediaType = require("../middleware/validateMediaType");

const router = express.Router();

router.post("/register", validateMediaType, controller.register);
router.post("/login", validateMediaType, controller.login);

module.exports = router;