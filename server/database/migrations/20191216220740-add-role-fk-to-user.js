module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('users', 'role_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'roles',
      key: 'id',
    },
    field: 'role_id',
  }),
  down: queryInterface => queryInterface.removeColumn('users', 'role_id'),
};
