module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('order_transactions', 'order_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
        },
        field: 'order_id',
      }),
      queryInterface.addColumn('order_transactions', 'product_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
        },
        field: 'product_id',
      }),
    ]);
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('order_transactions', 'order_id'),
      queryInterface.removeColumn('order_transactions', 'product_id'),
    ]);
  },
};
