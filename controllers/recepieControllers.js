const { StatusCodes } = require("http-status-codes");
const { recepies } = require("../models");
const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
  limits: 5000000,
  filefilter: (req, file, cb) => {
    const filetypes = /jpeg|png|jpg|gif/;
    const mimetypes = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetypes && extname) {
      return cb(null, true);
    }
    cb("Please provide files of the mentioned formats");
  },
}).array("imagem", 4);

const createRecepie = async (req, res) => {
  const { titulo, descricao, tempo_preparo, rendimento, custo_medio } =
    req.body;

  const newRecepie = await recepies.create({
    titulo,
    imagem: req.file,
    descricao,
    tempo_preparo,
    rendimento,
    custo_medio,
  });

  res.status(StatusCodes.CREATED).json({ addedRecepie: newRecepie });
};

module.exports = { createRecepie, upload };
