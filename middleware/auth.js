const jwt = require("jsonwebtoken");
const Unauthorized = require("./Unauthorized");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new Unauthorized("No auth header");
  }

  const token = authorization.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { UUID: user.UUID, email: user.email };

    next();
  } catch (error) {
    console.log("Headers " + authorization);
    console.log("Error " + error);
    throw new Unauthorized("Auth invalid");
  }
};

module.exports = { authMiddleware };
