const express = require("express");
const router = express.Router();
const { createRecepie } = require("../controllers/recepieControllers");

router.route("/recepie/create").post(createRecepie);
//router.route("/:id").post(login);

module.exports = router;
