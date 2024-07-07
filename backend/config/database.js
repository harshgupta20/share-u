const Sequelize = require('sequelize');
const sequelizeConfig = require("./config.json");

console.log("---------------",sequelizeConfig.development);

module.exports = new Sequelize(sequelizeConfig.development.database, sequelizeConfig.development.username, sequelizeConfig.development.password, {
 host: sequelizeConfig.development.host,
 dialect: sequelizeConfig.development.dialect, // Change to your database type
 port: sequelizeConfig.development.port
});
