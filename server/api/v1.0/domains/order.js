import models from '/models';

const create = async ({
  status,
  userId,
  transaction,
}) => await models.orders.create({
  status,
  userId,
}, { transaction });

const updateStatus = async ({
  orderId,
  statusId,
}) => await models.orders.update({ status: statusId }, {
  where: {
    id: orderId,
  },
  returning: true,
});

export default {
  create,
  updateStatus,
};
