const express = require("express");
const router = express.Router();
const {
  createRecepie,
  upload,
  getRecepie,
} = require("../controllers/recepieControllers");

router.route("/recepie/create").post(upload, createRecepie);
router.route("/recepie/:_id").get(getRecepie);

module.exports = router;
