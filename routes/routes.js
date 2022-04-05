const { StatusCodes } = require("http-status-codes");
const Pool = require("../connect");

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

  const newUser = await Pool.query(
    `INSERT INTO usuarios (nome, senha, email) VALUES($1,$1,$1)`,
    [nome, senha, email]
  );

  res.status(StatusCodes.OK).json({ newUser });
};
