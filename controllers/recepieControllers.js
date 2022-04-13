const Recepie = require("../models/recepies");
const multer = require("multer");
const fs = require("fs");

const createRecepie = async () => {
  const {
    inputTitulo,
    inputDescricao,
    inputImagem,
    inputTempo_preparo,
    inputRendimento,
    inputCusto_medio,
  } = req.body;

  const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: Storage }).single("testimage");

  const newRecepie = await Recepie.create({
    titulo: inputTitulo,
    descricao: inputDescricao,
    imagem: {
      data: req.file.filename,
      contentType: "image/png",
    },
    tempo_preparo: inputTempo_preparo,
    rendimento: inputRendimento,
    custo_medio: inputCusto_medio,
  });
};

module.exports = { createRecepie };
