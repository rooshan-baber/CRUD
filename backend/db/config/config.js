const { Sequelize } = require("sequelize");

// MySQL Configuration
const sequelize = new Sequelize("databasename","root","rootPassword",{
  dialect: "mysql",
  host: "localhost"
});
module.exports = sequelize;

