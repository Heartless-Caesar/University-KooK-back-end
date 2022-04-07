const express = require("express");
const { sequelize } = require("./models/index");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());

require("express-async-errors");

const start = async (req, res) => {
  try {
    await sequelize.authenticate();
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
