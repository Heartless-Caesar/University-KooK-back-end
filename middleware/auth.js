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
    console.log(user);
    req.user = { id: user.id, email: user.email };

    next();
  } catch (error) {
    console.log(req.headers.authorization);
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No auth header" });
  }
};

module.exports = { authMiddleware };
