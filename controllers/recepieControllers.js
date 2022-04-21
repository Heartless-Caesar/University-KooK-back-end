const { NotFoundError } = require("../middleware/notFound");
const { BadRequest } = require("../middleware/BadRequest");
const { recepies, User } = require("../models/index");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

//ACCESSING USER STORAGE SO UPLOAD BECOMES POSSIBLE
const Storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//UPLOAD FUNCTION FOR UPLOADING IMAGES
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

//CREATE NEW RECEPIE
const createRecepie = async (req, res) => {
  //INPUT "FORM" DATA
  const { titulo, descricao, tempo_preparo, rendimento, custo_medio } =
    req.body;

  //TESTING PURPOSES
  console.log(req.user);

  //USER UUID SERVING AS FOREIGN KEY
  const currentUser = await User.findOne({
    where: { UUID: req.user.UUID },
  });

  //BODY INPUT
  const newRecepie = await recepies.create({
    titulo: titulo,
    imagem: req.files,
    descricao: descricao,
    tempo_preparo: tempo_preparo,
    rendimento: rendimento,
    custo_medio: custo_medio,
    fk_id_usuario: currentUser.UUID,
  });

  //CORRECT RESPONSE
  res.status(StatusCodes.CREATED).json({
    addedRecepie: newRecepie,
    token: req.headers.authorization,
  });
};

//UPDATE RECEPIE
const updateRecepie = async (req, res) => {
  const { _id } = req.params;
  const { titulo, imagem, descricao, tempo_preparo, rendimento, custo_medio } =
    req.body;

  const toUpdateRecepie = await recepies.findOne({ where: { id: _id } });

  if (!toUpdateRecepie) {
    throw new BadRequest(`No recepie with an id of ${_id}`);
  }
  const updateBodyObject = {};

  if (titulo) updateBodyObject.titulo = titulo;
  if (descricao) updateBodyObject.descricao = descricao;
  if (tempo_preparo) updateBodyObject.tempo_preparo = tempo_preparo;
  if (rendimento) updateBodyObject.rendimento = rendimento;
  if (custo_medio) updateBodyObject.custo_medio = custo_medio;
  if (req.files) updateBodyObject.imagem = req.files;

  const updatedRecepie = await recepies.update(
    { where: { id: _id } },
    updateBodyObject
  );
  res.status(StatusCodes.OK).json({
    updatedRecepie: updatedRecepie,
    token: req.headers.authorization,
  });
};

//GET RECEPIE
const getRecepie = async (req, res) => {
  const { _id } = req.params;

  //FETCH ELEMENT ACCORDING TO URL PARAM
  const recepie = await recepies.findOne({
    where: { id: _id },
  });

  //ERROR HANDLER
  if (!recepie) {
    throw new NotFoundError(`No recepie with id ${_id}`);
  }

  //TEST
  console.log(req.headers);

  //DEFAULT RESPONSE
  res
    .status(StatusCodes.CREATED)
    .json({ recepie, token: req.headers.authorization });
};

const getAllRecepies = async (req, res) => {
  const allRecepies = await recepies.findAll({});

  if (!allRecepies) {
    throw new NotFoundError("There are no recepies currently");
  }

  res.status(StatusCodes.CREATED).json({ entries: allRecepies });
};
module.exports = {
  createRecepie,
  upload,
  getRecepie,
  updateRecepie,
  getAllRecepies,
};
