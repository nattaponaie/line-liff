
module.exports = (sequelize, DataTypes) => {
  const orderStatuses = sequelize.define('order_statuses', {
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
  }, {});
  orderStatuses.associate = function(models) {
    // associations can be defined here
  };
  return orderStatuses;
};
