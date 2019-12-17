import models from '/models';

import productStatusData from '../fixtures/product-status';

module.exports = {
  up: queryInterface => queryInterface.sequelize.transaction(async () => {
    return Promise.all(productStatusData.map(async (data) => {
      await models.product_statuses.findOrCreate({
        where: {
          status: data.status,
        },
        defaults: {
          ...data,
        },
      });
    }));
  }),
  down: queryInterface => queryInterface.sequelize.transaction(async () => queryInterface.bulkDelete('product_statuses', null, {})),
};
