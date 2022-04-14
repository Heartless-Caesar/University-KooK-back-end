const Recepie = require("../models/recepies");
const multer = require("multer");

const createRecepie = async (req, res) => {
  const {
    inputTitulo,
    inputDescricao,
    inputTempo_preparo,
    inputRendimento,
    inputCusto_medio,
  } = req.body;

  const newRecepie = await Recepie.create({
    titulo: inputTitulo,
    imagem: req.file,
    descricao: inputDescricao,
    tempo_preparo: inputTempo_preparo,
    rendimento: inputRendimento,
    custo_medio: inputCusto_medio,
  });

  res.status(201).json({ recepie: newRecepie });
};

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

//};
module.exports = { createRecepie, upload };
