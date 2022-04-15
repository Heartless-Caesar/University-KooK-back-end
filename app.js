const recepieRoutes = require("./routes/recepieRoutes");
const authMiddleware = require("./middleware/auth");
const authRouter = require("./routes/authRoutes");
const { sequelize } = require("./models/index");
const express = require("express");
require("express-async-errors");
const app = express();

//ENVIRONMENT VIRABLES
require("dotenv").config();
const port = process.env.PORT || 5000;

//JSON PARSING
app.use(express.json());
app.use(authMiddleware);

app.use("/uploads", express.static("./uploads"));

//APPLYING /APP TO ALL ROUTES IN THIS ROUTER
app.use("/app", [authRouter, recepieRoutes]);

//START APP FUNCTION
const start = async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
