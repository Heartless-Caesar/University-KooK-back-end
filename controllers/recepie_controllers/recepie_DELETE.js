const { StatusCodes } = require("http-status-codes");
const { recepies, User } = require("../../models");

//DELETE CONTROLLER
const deleteRecepie = async (req, res) => {
  //ID OF THE ITEM TO BE DELETED
  const { _id } = req.params;

  const checkCreatedBy = await recepies.findOne({
    where: { belongsTo: req.user.UUID },
  });

  if (checkCreatedBy.belongsTo == req.user.UUID) {
    //THE DELETION ITSELF
    const deletedItem = await recepies.destroy({ where: { id: _id } });

    //IF A RECEPIE WITH THE PROVIDED ID DOES NOT EXIST
    if (!deletedItem) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `No item with an id of ${_id}` });
    }
  }

  //OK RESPONSE
  res.status(StatusCodes.OK).json({ resp: "Deleted", deleted: deletedItem });
};

module.exports = { deleteRecepie };
