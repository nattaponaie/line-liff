import models from '/models';

const findByStatus = async ({
  statusId,
}) => await models.product_statuses.findOne({
  where: {
    status: statusId,
  },
});

export default {
  findByStatus,
};
