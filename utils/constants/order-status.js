import { lowerCase } from 'lodash';

export const STATUS_TYPE = ['new', 'preparing', 'served', 'removed', 'received'];

const transformStatusName = (statusName) => {
  const statusId = STATUS_TYPE.indexOf(lowerCase(statusName));
  return statusId;
};

const transformStatusId = (status) => {
  const statusName = STATUS_TYPE[status];
  return statusName;
};

export {
  transformStatusId,
  transformStatusName,
};
