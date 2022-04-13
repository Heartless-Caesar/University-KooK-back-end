const express = require("express");
const router = express.Router();
const { login, registerUser } = require("../controllers/controllers");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(login);

module.exports = router;
