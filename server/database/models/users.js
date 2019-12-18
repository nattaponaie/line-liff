
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    lineUserId: {
      type: DataTypes.STRING,
      field: 'line_user_id',
    },
    displayName: {
      type: DataTypes.STRING,
      field: 'display_name',
    },
    role: DataTypes.INTEGER,
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
