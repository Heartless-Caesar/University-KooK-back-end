"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    //USUARIO
    await queryInterface.createTable("usuarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //RECEITAS
    await queryInterface.createTable("receitas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        len: {
          args: [1, 500],
          msg: "Favor digitar uma descricao",
        },
      },
      rendimento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tempo_preparo: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      custo_medio: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fk_id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuario",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //AVALIACOES
    await queryInterface.createTable("avaliacoes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nota: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //COMENTARIOS
    await queryInterface.createTable("comentarios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      descricao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    //INGREDIENTS
    await queryInterface.createTable("ingredientes", {
      id_ingrediente: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unidade_medida: {
        type: Sequelize.CHAR,
        len: {
          args: [1, 2],
          msg: "Insira o valor da unidade de medida",
        },
      },
      ingredientescol: {
        type: Sequelize.VARCHAR,
        len: {
          args: [1, 45],
          msg: "Insira a descricao do ingrediente",
        },
      },
      fk_id_usuarios: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
