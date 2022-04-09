'use strict';
const {
  Model
} = require('sequelize');
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
  recepies.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    tempo_preparo: DataTypes.NUMBER,
    rendiment: DataTypes.NUMBER,
    custo_medio: DataTypes.NUMBER,
    fk_id_usuario: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'recepies',
  });
  return recepies;
};