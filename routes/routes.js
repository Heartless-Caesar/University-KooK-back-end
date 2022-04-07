const express = require("express");
const router = express.Router();
const { getAll, registerUser } = require("../controllers/controllers");

router.route("/auth/register").post(registerUser);

router.route("/").get(getAll);

module.exports = router;
