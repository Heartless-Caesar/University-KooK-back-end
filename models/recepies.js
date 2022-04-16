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
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagem: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      tempo_preparo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rendimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      custo_medio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fk_id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
