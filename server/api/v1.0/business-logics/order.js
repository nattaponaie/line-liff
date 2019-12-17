import {
  get, isEmpty,
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
import { NotFoundError } from '/utils/error';
import { transformSequelizeModel } from '/utils/json';

const create = async ({
  productId,
  userId,
}) => {
  const transaction = await models.sequelize.transaction({
    autocommit: false,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    deferrable: Sequelize.Deferrable.SET_IMMEDIATE,
  });

  try {
    const orderStatusResult = transformSequelizeModel(await orderStatus.findByStatus({ statusName: 'new' }));
    const statusId = get(orderStatusResult, 'status');

    const userResult = transformSequelizeModel(await user.findByUserId({ userId }));
    if (isEmpty(userResult)) {
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

export default {
  create,
};
