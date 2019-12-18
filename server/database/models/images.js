
module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define('images', {
    data: {
      type: DataTypes.BLOB('long'),
      get() {
        return this.getDataValue('data').toString('utf8'); // or whatever encoding is right
      },
    },
  }, {});
  images.associate = function(models) {
    // associations can be defined here
  };
  return images;
};
