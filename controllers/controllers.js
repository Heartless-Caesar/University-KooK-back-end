const { StatusCodes } = require("http-status-codes");
const { sequelize, User } = require("../models");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  const allRecepies = await User.findAll({});

  res.status(StatusCodes.OK).json({ allRecepies });
};

const registerUser = async (req, res) => {
  const { nome, senha, email } = req.body;

  if (!nome || !senha || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all credentials" });
  }

  const salt = await bcrypt.genSalt(10);

  const newUser = await User.create({
    nome,
    senha: await bcrypt.hash(senha, salt),
    email,
  });

  res.status(StatusCodes.OK).json({ msg: "working", item: newUser });
};

module.exports = { registerUser, getAll };
