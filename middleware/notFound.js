const { StatusCodes } = require("http-status-codes");
const { CustomClass } = require("./customErrorClass");

class NotFoundError extends CustomClass {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = { NotFoundError };
