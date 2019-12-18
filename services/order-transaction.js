import { get } from 'lodash';

import { transformStatusId } from '/utils/constants/order-status';
import { getRequest } from '/utils/httpHelper';

const getAllOrder = async () => {
  try {
    const orderTransaction =  await getRequest({
      path: 'order-transactions',
    });
    const order = orderTransaction.map(({
      id,
      order,
      product,
    }) => {
      return {
        key: id,
        orderId: get(order, 'id', 'none'),
        name: get(product, 'name', 'none'),
        status: transformStatusId(get(product, 'status', 'none')),
      };
    });
    return order;
  } catch (err) {
    throw err;
  }
};

export {
  getAllOrder,
};
