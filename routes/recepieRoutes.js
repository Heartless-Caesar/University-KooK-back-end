const express = require("express");
const router = express.Router();
const {
  createRecepie,
  upload,
  getRecepie,
  getAllRecepies,
  updateRecepie,
} = require("../controllers/recepieControllers");

router.route("/recepie/create").post(upload, createRecepie);
router.route("/recepie/:_id").get(getRecepie);
router.route("/recepie/:_id").put(upload, updateRecepie);
router.route("/recepies").get(getAllRecepies);

module.exports = router;
