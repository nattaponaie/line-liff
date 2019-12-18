import models from '/models';

import orderStatusData from '../fixtures/order-status';

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async () => {
    return Promise.all(orderStatusData.map(async (data) => {
      await models.order_statuses.findOrCreate({
        where: {
          status: data.status,
        },
        defaults: {
          ...data,
        },
      });
    }));
  }),
  down: queryInterface => queryInterface.sequelize.transaction(async () => queryInterface.bulkDelete('order_statuses', null, {})),
};
