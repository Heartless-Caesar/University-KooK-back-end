const { sequelize } = require("./models/index");
const router = require("./routes/routes");
const express = require("express");
require("express-async-errors");
const app = express();

//ENVIRONMENT VIRABLES
require("dotenv").config();
const port = process.env.PORT || 5000;

//JSON PARSING
app.use(express.json());

//APPLYING /APP TO ALL ROUTES IN THIS ROUTER
app.use("/app", router);

//START APP FUNCTION
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
