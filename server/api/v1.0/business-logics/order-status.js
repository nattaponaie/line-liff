import { lowerCase } from 'lodash';

import { orderStatus } from '/api/v1.0/domains';
import { InvalidError } from '/utils/error';

export const STATUS_TYPE = ['new', 'preparing', 'served', 'removed'];
const ERRORS_STATUS_NOT_FOUND = 'Order status does not exist';

const transformStatusName = (statusName) => {
  const statusId = STATUS_TYPE.indexOf(lowerCase(statusName));
  if (statusId === -1) {
    throw new InvalidError(ERRORS_STATUS_NOT_FOUND);
  }
  return statusId;
};

const findByStatus = async ({
  statusName,
}) => {
  const statusId = transformStatusName(statusName);
  return await orderStatus.findByStatus({ statusId });
};

export default {
  findByStatus,
};