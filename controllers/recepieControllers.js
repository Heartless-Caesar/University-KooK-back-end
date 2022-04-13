const Recepie = require("../models/recepies");
const multer = require("multer");

const createRecepie = async (req, res) => {
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

  const upload = multer({ storage: Storage }).single("imagem");

  new Promise(async function (resolve, reject) {
    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
      } else {
        const newRecepie = await Recepie.create({
          titulo: inputTitulo,
          descricao: inputDescricao,
          imagem: {
            data: req.file.filename,
            contentType: "image/jpeg",
          },
          tempo_preparo: inputTempo_preparo,
          rendimento: inputRendimento,
          custo_medio: inputCusto_medio,
        });
        res.status(200).json({ element: newRecepie });
      }
    });
  });
};

//};
module.exports = { createRecepie };
