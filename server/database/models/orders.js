
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    status: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id',
    },
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
    orders.belongsTo(models.users, { foreignKey: 'user_id', as: 'orderUser' } );
  };
  return orders;
};
