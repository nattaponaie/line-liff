import models from '/models';

const findByStatus = async ({
  statusId,
}) => await models.order_statuses.findOne({
  where: {
    status: statusId,
  },
});

export default {
  findByStatus,
};
