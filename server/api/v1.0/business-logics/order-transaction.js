import { orderTransaction } from '/api/v1.0/domains';

const create = async ({
  orderId,
  productId,
  transaction,
}) => await orderTransaction.create({ orderId, productId, transaction });

export default {
  create,
};
