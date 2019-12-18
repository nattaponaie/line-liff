
module.exports = (sequelize, DataTypes) => {
  const prices = sequelize.define('prices', {
    price: DataTypes.DECIMAL(10, 2),
  }, {});
  prices.associate = function(models) {
    // associations can be defined here
  };
  return prices;
};
