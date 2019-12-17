import models from '/models';

const findByStatus = async ({
  statusId,
}) => await models.statuses.findOne({
  where: {
    status: statusId,
  },
});

export default {
  findByStatus,
};
