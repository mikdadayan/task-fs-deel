const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { sequelize } = require("./model");
const errorHandler = require("./middleware/errorHandler");
const { getProfile } = require("./middleware/getProfile");

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use(routes);

app.use(errorHandler);

module.exports = app;
