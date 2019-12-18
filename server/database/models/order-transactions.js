
module.exports = (sequelize, DataTypes) => {
  const orderTransactions = sequelize.define('order_transactions', {
    quantity: DataTypes.INTEGER,
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'id',
      },
      field: 'order_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
      field: 'product_id',
    },
  }, {});
  orderTransactions.associate = function(models) {
    // associations can be defined here
    orderTransactions.belongsTo(models.orders, { foreignKey: 'order_id' } );
    orderTransactions.belongsTo(models.products, { foreignKey: 'product_id' } );
  };
  return orderTransactions;
};
