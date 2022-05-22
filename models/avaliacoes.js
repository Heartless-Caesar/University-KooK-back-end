'use strict';
const {
  Model
} = require('sequelize');
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
  avaliacoes.init({
    nota: DataTypes.DECIMAL,
    descricao: DataTypes.STRING,
    fk_id_usuario: DataTypes.INTEGER,
    fk_id_receita: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'avaliacoes',
  });
  return avaliacoes;
};