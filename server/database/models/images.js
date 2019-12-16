
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    data: DataTypes.BLOB('tiny'),
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
      field: 'product_id',
    },
  }, {});
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};
