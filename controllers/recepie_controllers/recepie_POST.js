const { StatusCodes } = require("http-status-codes");
const { recepies } = require("../../models");
const path = require("path");
const multer = require("multer");

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

  if (!newRecepie) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all the necessary elements" });
  }

  //CORRECT RESPONSE
  res.status(StatusCodes.CREATED).json({
    addedRecepie: newRecepie,
    token: req.headers.authorization,
  });
};

module.exports = { createRecepie };
