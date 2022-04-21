const { CustomClass } = require("./customErrorClass");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends CustomClass {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = { BadRequest };
