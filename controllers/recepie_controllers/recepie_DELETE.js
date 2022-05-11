const { StatusCodes } = require("http-status-codes");
const { recepies } = require("../../models");

//DELETE CONTROLLER
const deleteRecepie = async (req, res) => {
  //ID OF THE ITEM TO BE DELETED
  const { _id } = req.params;

  const checkCreatedBy = await recepies.findOne({
    where: { id: _id },
  });

  console.log("Testing");

  console.log(checkCreatedBy);

  console.log(req.user.id);

  console.log("End testing");

  if (checkCreatedBy.fk_id_usuario == req.user.id) {
    //THE DELETION ITSELF
    const deletedItem = await recepies.destroy({ where: { id: _id } });

    //IF A RECEPIE WITH THE PROVIDED ID DOES NOT EXIST
    if (!deletedItem) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: `No item with an id of ${_id}` });
    }
    //OK RESPONSE
    return res
      .status(StatusCodes.OK)
      .json({ resp: "Deleted", deleted: deletedItem });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong when trying to delete the recepie",
      UUID: `Current user id ${req.user.id} is not the id for the current recepie ${checkCreatedBy.fk_id_usuario}`,
    });
  }
};

module.exports = { deleteRecepie };
