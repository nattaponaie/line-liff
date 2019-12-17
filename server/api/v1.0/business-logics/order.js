import {
  get, isEmpty,
} from 'lodash';

import {
  status, user,
} from '/api/v1.0/business-logics';
import { order } from '/api/v1.0/domains';
import { NotFoundError } from '/utils/error';
import { transformSequelizeModel } from '/utils/json';

const create = async ({
  productName,
  productImage,
  price,
  userId,
}) => {
  const statusResult = transformSequelizeModel(await status.findByStatus({ statusName: 'new' }));
  const statusId = get(statusResult, 'status');

  const userResult = transformSequelizeModel(await user.findByUserId({ userId }));
  console.log('userResult', userResult);
  if (isEmpty(userResult)) {
    throw new NotFoundError(user.ERROR_CANNOT_FOUND_USER);
  }

  const orderResult = transformSequelizeModel(await order.create({ status: statusId, userId }));
  console.log('orderResult', orderResult);
  return orderResult;
};

export default {
  create,
};
