'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('avaliacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nota: {
        type: Sequelize.DECIMAL
      },
      descricao: {
        type: Sequelize.STRING
      },
      fk_id_usuario: {
        type: Sequelize.INTEGER
      },
      fk_id_receita: {
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
    await queryInterface.dropTable('avaliacoes');
  }
};