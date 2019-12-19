import { isNil } from 'lodash';

import { orderTransaction } from '/api/v1.0/domains';
import { transformSequelizeModel } from '/utils/json';

const create = async ({
  orderId,
  productId,
  transaction,
}) => await orderTransaction.create({ orderId, productId, transaction });

const getAllOrderTransaction = async () => await orderTransaction.getAll();

const getAllOrderByLineUserId = async ({
  lineUserId,
}) => {
  const orderTransctionResult = transformSequelizeModel(await orderTransaction.getAllOrderByLineUserId({ lineUserId }));
  return orderTransctionResult.filter((tran => !isNil(tran.order)));
};

export default {
  create,
  getAllOrderTransaction,
  getAllOrderByLineUserId,
};
