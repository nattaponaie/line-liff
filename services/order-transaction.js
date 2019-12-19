import { get } from 'lodash';

import { transformStatusId } from '/utils/constants/order-status';
import { getRequest } from '/utils/httpHelper';
import {
  API_PREFIX, SSE_GET_ORDER_EVENT,
} from '/web-config';

const constructOrderTransaction = ({ list }) => list.map(({
  id,
  order,
  product,
}) => {
  return {
    key: id,
    orderId: get(order, 'id', 'none'),
    name: get(product, 'name', 'none'),
    status: transformStatusId(get(order, 'status', 'none')),
  };
});

const getAllOrder = async () => {
  try {
    const orderTransaction =  await getRequest({
      path: 'order-transactions',
    });
    return constructOrderTransaction({ list: orderTransaction });
  } catch (err) {
    throw err;
  }
};

const getAllOrderBySSE = ({ allOrderWrapper }) => {
  const sseUrl = `${API_PREFIX}/v1.0/order-transactions/sse`;
  const eventSource = new EventSource(sseUrl);
  const eventName = SSE_GET_ORDER_EVENT;
  eventSource.addEventListener(eventName, (result) => {
    const data = get(JSON.parse(result.data), 'attributes');
    const orderTransaction = constructOrderTransaction({ list: data });
    allOrderWrapper(() => orderTransaction);
  });
};

export {
  getAllOrder,
  getAllOrderBySSE,
};
