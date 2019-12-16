
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
