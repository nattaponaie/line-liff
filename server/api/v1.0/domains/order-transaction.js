import models from '/models';

const create = async ({
  orderId,
  productId,
  transaction,
}) => await models.order_transactions.create({
  orderId,
  productId,
}, { transaction });

const getAll = async () => await models.order_transactions.findAll({
  include: [
    {
      model: models.orders,
    },
    {
      model: models.products,
    },
  ],
});

export default {
  create,
  getAll,
};
