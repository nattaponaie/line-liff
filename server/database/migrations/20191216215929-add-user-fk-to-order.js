module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('orders', 'user_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'user_id',
  }),
  down: queryInterface => queryInterface.removeColumn('orders', 'user_id'),
};
