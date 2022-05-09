const { comentarios, avaliacoes } = require("../../models");
const { StatusCodes } = require("http-status-codes");

const postComment = async (req, res) => {
  const { _id } = req.params;
  const { descricao } = req.body;

  const checkRating = await avaliacoes.findOne({ where: { id: _id } });

  if (!checkRating) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `No rating associated to the id ${_id}` });
  }

  const newComment = await comentarios.create({ descricao });

  res
    .status(StatusCodes.OK)
    .json({ msg: `Comment created`, comment: newComment });
};

module.exports = postComment;
