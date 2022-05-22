'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('receitas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      imagem: {
        type: Sequelize.BLOB
      },
      tempo_preparo: {
        type: Sequelize.INTEGER
      },
      categoria: {
        type: Sequelize.ENUM
      },
      rendimento: {
        type: Sequelize.INTEGER
      },
      fk_id_ingredientes: {
        type: Sequelize.INTEGER
      },
      custo_medio: {
        type: Sequelize.INTEGER
      },
      fk_id_usuario: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('receitas');
  }
};