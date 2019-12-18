import {
  get, head,
  isEmpty,
} from 'lodash';
import Sequelize from 'sequelize';

import {
  orderStatus,
  orderTransaction,
  product,
  user,
} from '/api/v1.0/business-logics';
import { order } from '/api/v1.0/domains';
import models from '/models';
import { transformStatusName } from '/utils/constants/order-status';
import {
  InvalidError,
  NotFoundError,
} from '/utils/error';
import { transformSequelizeModel } from '/utils/json';

const create = async ({
  productId,
  lineUserId,
  displayName,
}) => {
  const transaction = await models.sequelize.transaction({
    autocommit: false,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    deferrable: Sequelize.Deferrable.SET_IMMEDIATE,
  });

  try {
    const orderStatusResult = transformSequelizeModel(await orderStatus.findByStatus({ statusName: 'new' }));
    const statusId = get(orderStatusResult, 'status');

    const userResult = head(transformSequelizeModel(await user.create({
      lineUserId,
      displayName,
      roleName: 'user',
      transaction,
    })));
    const userId = get(userResult, 'id');
    if (!userId) {
      throw new NotFoundError(user.ERROR_CANNOT_FOUND_USER);
    }

    const productResult = transformSequelizeModel(await product.findById({ productId }));
    if (isEmpty(productResult)) {
      throw new NotFoundError(product.ERROR_CANNOT_FOUND_PRODUCT_ID);
    }

    const orderResult = transformSequelizeModel(await order.create({ status: statusId, userId, transaction }));
    const orderId = get(orderResult, 'id');

    await orderTransaction.create({ orderId, productId, transaction });

    transaction.commit();
    return orderResult;
  } catch (err) {
    transaction.rollback();
    throw err;
  }
};

const updateStatus = async ({
  orderId,
  status,
}) => {
  const statusId = transformStatusName(status);
  if (statusId === -1) {
    throw new InvalidError(orderStatus.ERRORS_STATUS_NOT_FOUND);
  }
  return await order.updateStatus({ orderId, statusId });
};

export default {
  create,
  updateStatus,
};
