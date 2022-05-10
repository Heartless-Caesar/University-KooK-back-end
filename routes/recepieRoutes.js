const express = require("express");
const router = express.Router();
const {
  getAllRecepies,
} = require("../controllers/recepie_controllers/recepie_GET_ALL");

const {
  createRecepie,
  upload,
} = require("../controllers/recepie_controllers/recepie_POST");

const {
  getRecepie,
} = require("../controllers/recepie_controllers/recepie_GET_SINGLE");

const {
  deleteRecepie,
} = require("../controllers/recepie_controllers/recepie_DELETE");

const {
  updateRecepie,
} = require("../controllers/recepie_controllers/recepie_PUT");

const {
  postComment,
} = require("../controllers/rating_controllers/comment_POST");

const { postRating } = require("../controllers/rating_controllers/rating_POST");

router.route("/recepie/create").post(upload, createRecepie);
router.route("/recepie/:_id").put(upload, updateRecepie);
router.route("/recepie/:_id").delete(deleteRecepie);
router.route("/recepie/:_id").get(getRecepie).post(postComment, postRating);
router.route("/recepies").get(getAllRecepies);

module.exports = router;
