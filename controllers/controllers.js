const { StatusCodes } = require("http-status-codes");
const { sequelize, User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/*const getAll = async (req, res) => {
  const allRecepies = await User.findAll({});

  res.status(StatusCodes.OK).json({ allRecepies });
};*/

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

  const signToken = jwt.sign({ newUser: newUser }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "working", item: newUser, token: signToken });
};

const login = async (req, res) => {
  const { loginEmail, senha } = req.body;

  if (!loginEmail || !senha) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide both credentials" });
  }

  const dbUser = await User.findOne({ where: { email: loginEmail } });

  res.status(StatusCodes.OK).json({ dbUser });
};

module.exports = { registerUser, login };
