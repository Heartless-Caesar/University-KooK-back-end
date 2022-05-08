'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comentarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comentarios.init({
    descricao: DataTypes.STRING,
    fk_id_usuario: DataTypes.INTEGER,
    fk_id_avaliacao: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comentarios',
  });
  return comentarios;
};