
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    name: DataTypes.STRING,
    imageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'images',
        key: 'id',
      },
      field: 'image_id',
    },
    priceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prices',
        key: 'id',
      },
      field: 'price_id',
    },
    status: DataTypes.INTEGER,
  }, {});
  products.associate = function(models) {
    // associations can be defined here
    products.belongsTo(models.images, { foreignKey: 'image_id' } );
    products.belongsTo(models.prices, { foreignKey: 'price_id' } );
  };
  return products;
};
