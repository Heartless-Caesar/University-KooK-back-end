const { StatusCodes } = require("http-status-codes");
const { recepies, User } = require("../models/index");
const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
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

//CREATE
const createRecepie = async (req, res) => {
  const { titulo, descricao, tempo_preparo, rendimento, custo_medio } =
    req.body;

  const currentUser = await User.findOne({ where: { UUID: req.user.UUID } });
  //const token = jwt.sign({ user });
  const newRecepie = await recepies.create({
    titulo: titulo,
    imagem: req.files,
    descricao: descricao,
    tempo_preparo: tempo_preparo,
    rendimento: rendimento,
    custo_medio: custo_medio,
    fk_id_usuario: currentUser.UUID,
  });

  res.status(StatusCodes.CREATED).json({
    addedRecepie: newRecepie,
    token: req.headers.authorization.split(" ")[1],
  });
};

//GET RECEPIE
const getRecepie = async (req, res) => {
  const { id } = req.params;

  const recepie = await recepies.findOne({ where: { id: id } });

  if (!recepie) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Recepie of id ${id} not found` });
  }

  //TEST
  console.log(req.headers);

  res.status(StatusCodes.OK).json({ createdRecepie: recepie });
};

module.exports = { createRecepie, upload, getRecepie };
