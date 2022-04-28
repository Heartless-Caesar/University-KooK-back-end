const express = require("express");
const router = express.Router();
const {
  createRecepie,
  upload,
  getRecepie,
  getAllRecepies,
  updateRecepie,
  deleteRecepie,
} = require("../controllers/recepie_controllers");

router.route("/recepie/create").post(upload, createRecepie);
router.route("/recepie/:_id").put(upload, updateRecepie);
router.route("/recepie/:_id").delete(deleteRecepie);
router.route("/recepie/:_id").get(getRecepie);
router.route("/recepies").get(getAllRecepies);

module.exports = router;
