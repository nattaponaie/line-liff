import models from '/models';

import roleData from '../fixtures/role';

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async () => {
    return Promise.all(roleData.map(async (data) => {
      await models.roles.findOrCreate({
        where: {
          role: data.role,
        },
        defaults: {
          ...data,
        },
      });
    }));
  }),
  down: queryInterface => queryInterface.sequelize.transaction(async () => queryInterface.bulkDelete('roles', null, {})),
};
