const { StatusCodes } = require("http-status-codes");
const { CustomClass } = require("./customErrorClass");

class Unauthorized extends CustomClass {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
