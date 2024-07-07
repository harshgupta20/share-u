const Sequelize = require("sequelize");
const db = require("../config/database");


const TempUserTable = db.define("temp_user_tables", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  otp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});


module.exports = TempUserTable;
