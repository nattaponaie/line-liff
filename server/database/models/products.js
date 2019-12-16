
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
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};
