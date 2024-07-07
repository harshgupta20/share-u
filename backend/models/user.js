const Sequelize = require("sequelize");
const db = require("../config/database");
const Link = require("./link");


const User = db.define("users", {

  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  role_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  is_profile_completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});

User.hasMany(Link, {foreignKey: "user_id"}); // A HasMany B

module.exports = User;
