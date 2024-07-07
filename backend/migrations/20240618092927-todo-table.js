'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addColumn('todos', 'createdDate', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('todos', 'percentCompleted', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

    await queryInterface.addColumn('todos', 'isCompleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('todos', 'createdDate');
    await queryInterface.removeColumn('todos', 'percentCompleted');
    await queryInterface.removeColumn('todos', 'isCompleted');

    await queryInterface.dropTable('todos');
  },
};
