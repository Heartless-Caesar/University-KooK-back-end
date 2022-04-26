const { NotFoundError } = require("../middleware/notFound");
const { BadRequest } = require("../middleware/BadRequest");
const { recepies, User } = require("../models/index");
const { StatusCodes } = require("http-status-codes");
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
/*THIS ARRAY METHOD INSTANCITATES THE NAME FOR THE 
FOLLOWING NUMBER OF FILES TO BE ACCEPTED IN THE UPLOAD*/

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

//UPDATE RECEPIE
const updateRecepie = async (req, res) => {
  const { _id } = req.params;
  const { titulo, imagem, descricao, tempo_preparo, rendimento, custo_medio } =
    req.body;

  //FINDS THE DESIRED ELEMENT
  const toUpdateRecepie = await recepies.update(
    {
      titulo,
      descricao,
      tempo_preparo,
      imagem: req.files,
      rendimento,
      custo_medio,
    },
    { where: { id: _id } }
  );

  //IF UPDATE FAILS FOR WHATEVER REASON
  if (!toUpdateRecepie) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `No item with an ID of ${id}` });
  }

  //OK RESPONSE
  res.status(StatusCodes.OK).json({
    updatedRecepie: toUpdateRecepie,
    token: req.headers.authorization,
  });
};
//END UPDATE RECEPIE

//GET SINGLE RECEPIE
const getRecepie = async (req, res) => {
  const { _id } = req.params;

  //FETCH ELEMENT ACCORDING TO URL PARAM
  const recepie = await recepies.findOne({
    where: { id: _id },
  });

  //ERROR HANDLER
  if (!recepie) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `No recepie with id ${_id}` });
  }

  //TEST
  console.log(req.headers);

  //DEFAULT RESPONSE
  res
    .status(StatusCodes.CREATED)
    .json({ recepie, token: req.headers.authorization });
};

//GET ALL RECEPIES FROM DB
const getAllRecepies = async (req, res) => {
  //FETCHES ALL THE RECEPIES IN THE DB
  const allRecepies = await recepies.findAll({});

  //IF DB IS EMPTY ERROR MESSAGE
  if (!allRecepies) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "There are no recepies currently" });
  }

  //OK RESPONSE
  res.status(StatusCodes.CREATED).json({ entries: allRecepies });
};
//END GET SINGLE RECEPIE

//DELETE CONTROLLER
const deleteRecepie = async (req, res) => {
  //ID OF THE ITEM TO BE DELETED
  const { _id } = req.params;

  //THE DELETION ITSELF
  const deletedItem = await recepies.destroy({ where: { id: _id } });

  //IF A RECEPIE WITH THE PROVIDED ID DOES NOT EXIST
  if (!deletedItem) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `No item with an id of ${_id}` });
  }

  //OK RESPONSE
  res.status(StatusCodes.OK).json({ resp: "Deleted", deleted: deletedItem });
};

module.exports = {
  createRecepie,
  upload,
  getRecepie,
  updateRecepie,
  getAllRecepies,
  deleteRecepie,
};
