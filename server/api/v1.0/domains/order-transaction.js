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

const getAllOrderByLineUserId = async ({
  lineUserId,
}) => await models.order_transactions.findAll({
  include: [
    {
      model: models.orders,
      include: {
        model: models.users,
        as: 'orderUser',
        where: {
          lineUserId,
        },
      },
    },
    {
      model: models.products,
    },
  ],
});

export default {
  create,
  getAll,
  getAllOrderByLineUserId,
};
