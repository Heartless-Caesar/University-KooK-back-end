'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ingredientes.init({
    nome: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    unidade_medida: DataTypes.STRING,
    fk_receita_id: DataTypes.INTEGER,
    fk_usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ingredientes',
  });
  return ingredientes;
};