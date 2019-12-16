import models from '/models';

import statusData from '../fixtures/status';

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async () => {
    return Promise.all(statusData.map(async (data) => {
      await models.statuses.findOrCreate({
        where: {
          status: data.status,
        },
        defaults: {
          ...data,
        },
      });
    }));
  }),
  down: queryInterface => queryInterface.sequelize.transaction(async () => queryInterface.bulkDelete('statuses', null, {})),
};
