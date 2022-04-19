const jwt = require("jsonwebtoken");
const Unauthorized = require("./Unauthorized");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("No auth header");
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { UUID: user.UUID, email: user.email };

    next();
  } catch (error) {
    console.log(token);
    throw new Unauthorized("Auth invalid");
  }
};

module.exports = { authMiddleware };
