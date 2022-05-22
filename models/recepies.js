'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class receitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  receitas.init({
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
    },
    tempo_preparo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Tempo_preparo não pode ser nulo" },
      },
    },
    categoria: {
      type: DataTypes.ENUM("lanche", "almoco", "jantar", "cafe_da_manha"),
      allowNull: false,
    },
    rendimento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Rendimento não pode ser nulo" },
      },
    },
    fk_id_ingredientes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    custo_medio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Custo_medio não pode ser nulo" },
      },
    },
    fk_id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'recepies',
    tableName: 'recepies',
  });
  return receitas;
};