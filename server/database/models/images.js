
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    data: DataTypes.BLOB('tiny'),
  }, {});
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};
