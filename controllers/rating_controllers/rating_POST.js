const { avaliacoes, recepies } = require("../../models");
const { StatusCodes, NOT_ACCEPTABLE } = require("http-status-codes");

const postRating = async (req, res) => {
  const { _id } = req.params;
  const { nota, descricao } = req.body;

  const recepieCheck = await recepies.findOne({ where: { id: _id } });

  if (!recepieCheck) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `No recepie with an id of ${_id}` });
  }

  const newRating = await avaliacoes.create({
    ratingNum: nota,
    Body: descricao,
    fk_usuario_id: req.user.UUID,
    fk_recepie_id: _id,
  });

  res.status(StatusCodes.OK).json({ msg: "Rating posted", item: newRating });
};
