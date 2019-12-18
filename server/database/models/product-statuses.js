
module.exports = (sequelize, DataTypes) => {
  const productStatuses = sequelize.define('product_statuses', {
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
  }, {});
  productStatuses.associate = function(models) {
    // associations can be defined here
  };
  return productStatuses;
};
