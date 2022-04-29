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
        validate: {
          notEmpty: { msg: "Titulo não pode ser nulo" },
        },
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Descricao não pode ser nulo" },
        },
      },
      imagem: {
        type: DataTypes.BLOB,
        allowNull: true,
        belongsTo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      tempo_preparo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: { msg: "Tempo_preparo não pode ser nulo" },
        },
      },
      rendimento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: { msg: "Rendimento não pode ser nulo" },
        },
      },
      custo_medio: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: { msg: "Custo_medio não pode ser nulo" },
        },
      },
      fk_id_usuario: {
        type: DataTypes.STRING,
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
