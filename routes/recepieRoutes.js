const express = require("express");
const router = express.Router();
const { createRecepie, upload } = require("../controllers/recepieControllers");

router.route("/recepie/create").post(upload, createRecepie);
//router.route("/:id").post(login);

module.exports = router;
