module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('products', 'image_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'images',
          key: 'id',
        },
        field: 'image_id',
      }),
      queryInterface.addColumn('products', 'price_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'prices',
          key: 'id',
        },
        field: 'price_id',
      }),
    ]);
  },
  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('products', 'image_id'),
      queryInterface.removeColumn('products', 'price_id'),
    ]);
  },
};
