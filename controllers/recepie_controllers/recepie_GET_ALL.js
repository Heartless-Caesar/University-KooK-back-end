const { StatusCodes } = require("http-status-codes");
const { recepies } = require("../../models");

//GET ALL RECEPIES FROM DB
const getAllRecepies = async (req, res) => {
  //FETCHES ALL THE RECEPIES IN THE DB
  const allRecepies = await recepies.findAll({});

  //IF DB IS EMPTY ERROR MESSAGE
  if (!allRecepies || allRecepies.length == []) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "There are no recepies currently" });
  }

  //OK RESPONSE
  res.status(StatusCodes.CREATED).json({ entries: allRecepies });
};

module.exports = { getAllRecepies };
