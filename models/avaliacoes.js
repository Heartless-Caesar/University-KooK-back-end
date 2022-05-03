"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class avaliacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  avaliacoes.init(
    {
      nota: DataTypes.NUMBER,
      fk_usuario_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "avaliacoes",
      tableName: "avaliacoes",
    }
  );
  return avaliacoes;
};
