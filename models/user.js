"use strict";
const { Model, UUIDV4 } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      UUID: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "usuario",
      modelName: "User",
    }
  );
  return User;
};
