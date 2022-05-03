const { avaliacoes } = require("../../models");
const { StatusCodes } = require("http-status-codes");

const postRating = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ msg: "Rating posted", item: "json object here" });
};
