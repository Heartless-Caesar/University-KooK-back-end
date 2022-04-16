const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No auth header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { UUID: user.UUID, email: user.email };

    next();
  } catch (error) {
    console.log(req.headers);
    console.log(req.user);
    console.log(error);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Something went wrong" });
  }
};

module.exports = authMiddleware;
