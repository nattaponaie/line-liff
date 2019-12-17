import models from '/models';

const create = async ({
  status,
  userId,
  transaction,
}) => await models.orders.create({
  status,
  userId,
}, { transaction });

export default {
  create,
};
