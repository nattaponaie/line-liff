
module.exports = (sequelize, DataTypes) => {
  const prices = sequelize.define('prices', {
    price: DataTypes.DECIMAL(10, 2),
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  }, {});
  prices.associate = function(models) {
    // associations can be defined here
  };
  return prices;
};
