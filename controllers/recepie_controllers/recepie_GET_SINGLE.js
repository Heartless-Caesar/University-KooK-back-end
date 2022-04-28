const { StatusCodes } = require("http-status-codes");
const { recepies } = require("../../models");

//GET SINGLE RECEPIE
const getRecepie = async (req, res) => {
  const { _id } = req.params;

  //FETCH ELEMENT ACCORDING TO URL PARAM
  const recepie = await recepies.findOne({
    where: { id: _id },
  });

  //ERROR HANDLER
  if (!recepie) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `No recepie with id ${_id}` });
  }

  //TEST
  console.log(req.headers);

  //DEFAULT RESPONSE
  res
    .status(StatusCodes.CREATED)
    .json({ recepie, token: req.headers.authorization });
};

module.exports = { getRecepie };
