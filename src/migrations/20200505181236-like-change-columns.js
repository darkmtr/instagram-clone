'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      await queryInterface.removeColumn('likes', 'postId'),
      await queryInterface.removeColumn('likes', 'userId'),
      await queryInterface.addColumn('likes', 'userId', Sequelize.INTEGER, {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      }),
      await queryInterface.addColumn('likes', 'postId', Sequelize.INTEGER, {
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
      }),
    ];

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
