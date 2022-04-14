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
      titulo: {
        type: DataTypes.STRING,
      },
      descricao: {
        type: DataTypes.STRING,
      },
      imagem: {
        type: DataTypes.BLOB,
      },
      tempo_preparo: {
        type: DataTypes.INTEGER,
      },
      rendimento: {
        type: DataTypes.INTEGER,
      },
      custo_medio: {
        type: DataTypes.INTEGER,
      },
      fk_id_usuario: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "recepies",
      tableName: "recepies",
    }
  );
  return recepies;
};
