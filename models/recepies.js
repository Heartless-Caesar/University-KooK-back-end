"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recepies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recepies.init(
    {
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      imagem: DataTypes.BLOB,
      tempo_preparo: DataTypes.INTEGER,
      rendimento: DataTypes.INTEGER,
      custo_medio: DataTypes.INTEGER,
      fk_id_usuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "recepies",
    }
  );
  return recepies;
};
