const { StatusCodes } = require("http-status-codes");

let errorHandlerMiddleware = (err, req, res, next) => {
  //DEFAULT ERROR THAT CAN BE MODIFIED IN GIVEN INSTANCES
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong...",
  };

  //MODIFIES CUSTOM ERROR IF THERE'S A VALIDATION ERROR DURING A LOGIN ATTEMPT
  if (err.name === "Validation error") {
    customError.message = Object.values(err.errors)
      .map((x) => x.message)
      .join(",");
    customError.statusCode = 400;
  }

  //MODIFIES CUSTOM ERROR IF THERE'S A CASE OF DUPLICATION DURING REGISTRATION
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value encountered on the ${Object.keys(
      err.keyValue
    )}
        field, please choose another value`;
    customError.statusCode = 400;
  }

  //MODIFIES CUSTOM ERROR IF THE ID PLACED IN AN URL IS NOT VALID
  if (err.name === "CastError") {
    customError.message = `No item with an Id of ${err.value} found.`;
    customError.statusCode = 404;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = { errorHandlerMiddleware };
