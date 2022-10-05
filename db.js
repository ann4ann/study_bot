const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  "bulmyhmhoux8xtqkty2d", // db name
  "uygt2gsglq1ct3iqfwra", // user name
  "zTfS9OLg5LfCrCWpCZK6", // password
  {
    // options
    host: "bulmyhmhoux8xtqkty2d-postgresql.services.clever-cloud.com",
    port: "5432",
    dialect: "postgres",
  }
);
