const recepies = require("../models/recepies");
const multer = require("multer");
const fs = require("fs");

const createRecepie = async () => {
  const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: Storage }).single("testimage");
};

module.exports = { createRecepie };
