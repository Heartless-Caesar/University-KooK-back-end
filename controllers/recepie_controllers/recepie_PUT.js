const { StatusCodes } = require("http-status-codes");
const { recepies } = require("../../models");

//UPDATE RECEPIE
const updateRecepie = async (req, res) => {
  const { _id } = req.params;
  const { titulo, descricao, tempo_preparo, rendimento, custo_medio } =
    req.body;

  let toUpdateRecepie = await recepies.findOne({ where: { id: _id } });

  if (toUpdateRecepie.fk_id_usuario == req.user.id) {
    //UPDATES THE DESIRED ELEMENT
    toUpdateRecepie = await recepies.update(
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

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Updated element", updatedItem: toUpdateRecepie });
  }

  //OK RESPONSE
  res.status(StatusCodes.UNAUTHORIZED).json({
    msg: "Recepie not updated",
  });
};

module.exports = { updateRecepie };
