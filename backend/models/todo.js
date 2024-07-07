const Sequelize = require("sequelize");
const db = require("../config/database");


const Todo = db.define("todos", {

  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});


module.exports = Todo;
