module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('images', 'product_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'products',
      key: 'id',
    },
    field: 'product_id',
  }),
  down: queryInterface => queryInterface.removeColumn('images', 'product_id'),
};
