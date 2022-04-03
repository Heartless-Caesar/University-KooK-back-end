const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.username,
  process.env.password,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

try {
  await sequelize.authenticate();
  console.log("Connected to DB");
} catch (error) {
  console.log(error);
}
