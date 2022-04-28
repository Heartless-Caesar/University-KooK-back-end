const { StatusCodes } = require("http-status-codes");
const { sequelize, User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//REGISTRATION
const registerUser = async (req, res) => {
  const { nome, senha, email } = req.body;

  const salt = await bcrypt.genSalt(10);

  if (!nome || !senha || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all credentials" });
  }
  const newUser = await User.create({
    nome,
    senha: await bcrypt.hash(senha, salt),
    email,
  });

  const signToken = jwt.sign(
    { UUID: newUser.UUID, email: newUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "Registered", item: newUser, token: signToken });
};

//LOGIN
const login = async (req, res) => {
  const { loginEmail, senha } = req.body;

  if (!loginEmail || !senha) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide both credentials" });
  }

  const dbUser = await User.findOne({ where: { email: loginEmail } });

  if (!dbUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No such user" });
  }

  const senhaParaComapracao = await User.findOne({
    where: { email: loginEmail },
  });

  const comparePasswords = await bcrypt.compare(
    senha,
    senhaParaComapracao.senha
  );

  if (!comparePasswords) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Passwords don't match" });
  }
  const loginToken = jwt.sign(
    { email: dbUser.email, UUID: dbUser.UUID },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  res.status(StatusCodes.OK).json({ user: dbUser, token: loginToken });
};

module.exports = { registerUser, login };
