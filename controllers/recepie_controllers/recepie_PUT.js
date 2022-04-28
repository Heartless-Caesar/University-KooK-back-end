const { StatusCodes } = require("http-status-codes");
const { recepies } = require("../../models");

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

module.exports = { updateRecepie };
