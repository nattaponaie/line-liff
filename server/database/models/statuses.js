
module.exports = (sequelize, DataTypes) => {
  const statuses = sequelize.define('statuses', {
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
  }, {});
  statuses.associate = function(models) {
    // associations can be defined here
  };
  return statuses;
};
