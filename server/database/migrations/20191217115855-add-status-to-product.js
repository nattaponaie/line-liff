module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('products', 'status', {
    type: Sequelize.INTEGER,
    allowNull: true,
    field: 'status',
  }),
  down: queryInterface => queryInterface.removeColumn('products', 'status'),
};
