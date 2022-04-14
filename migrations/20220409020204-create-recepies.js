"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("recepies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      imagem: {
        type: DataTypes.BLOB,
      },
      titulo: {
        type: DataTypes.STRING(45),
      },
      descricao: {
        type: DataTypes.STRING(1000),
      },
      tempo_preparo: {
        type: DataTypes.NUMBER(3),
      },
      rendimento: {
        type: DataTypes.NUMBER,
      },
      custo_medio: {
        type: DataTypes.NUMBER,
      },
      fk_id_usuario: {
        type: DataTypes.NUMBER,
        references: {
          references: "usuario",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("recepies");
  },
};
