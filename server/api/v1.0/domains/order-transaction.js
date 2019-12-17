import models from '/models';

const create = async ({
  orderId,
  productId,
  transaction,
}) => await models.order_transactions.create({
  orderId,
  productId,
}, { transaction });

export default {
  create,
};
