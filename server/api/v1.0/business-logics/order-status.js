
import { orderStatus } from '/api/v1.0/domains';
import { transformStatusName } from '/utils/constants/order-status';
import { InvalidError } from '/utils/error';

const ERRORS_STATUS_NOT_FOUND = 'Order status does not exist';

const findByStatus = async ({
  statusName,
}) => {
  const statusId = transformStatusName(statusName);
  if (statusId === -1) {
    throw new InvalidError(ERRORS_STATUS_NOT_FOUND);
  }
  return await orderStatus.findByStatus({ statusId });
};

export default {
  transformStatusName,
  findByStatus,
};
