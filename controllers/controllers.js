const { StatusCodes } = require("http-status-codes");
const { sequelize, User } = require("../models");

const getAll = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "working" });
};

const registerUser = async (req, res) => {
  const { nome, senha, email } = req.body;

  if (!nome || !senha || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all credentials" });
  }

  const newUser = await User.create({ nome, senha, email });

  res.status(StatusCodes.OK).json({ msg: "working", item: newUser });
};

module.exports = { registerUser, getAll };
