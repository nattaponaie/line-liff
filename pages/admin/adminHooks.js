import { message } from 'antd';
import { get } from 'lodash';
import {
  useEffect, useMemo,
} from 'react';

import { updateOrderStatus } from '/services/order';
import { getAllOrder } from '/services/order-transaction';
import { useLoadingState } from '/utils/useLoadingState';
import { useResponseMessage } from '/utils/useResponseMessage';

export const onStatusChange = ({
  record,
  updateOrderStatusWrapper,
}) => async (event) => {
  updateOrderStatusWrapper(async () => {
    try {
      const orderId = get(record, 'orderId');
      const result = await updateOrderStatus({ orderId, status: event });
      message.success('Order status has been updated successfully!');
      return result;
    } catch (err) {
      message.error(`There is an error during updated order status ${err}`);
    }
  });
};

export const useAdmin = () => {
  const { responseMessages, appendResponseMessage } = useResponseMessage();

  const [
    allOrderLoading,
    allOrder,
    getAllOrderWrapper,
  ] = useLoadingState(null);

  const [
    updateOrderStatusWrapper,
  ] = useLoadingState(null);

  useEffect(() => {

    getAllOrderWrapper(async () => {
      try {
        const result = await getAllOrder();
        appendResponseMessage({ msg: 'success' });
        return result;
      } catch (err) {
        message.error(`There is an error during get order ${err}`);
        appendResponseMessage({ msg: `There is an error during get order ${err}` });
      }
    });

  }, [appendResponseMessage, getAllOrderWrapper]);

  return useMemo(() => ({
    allOrderLoading,
    allOrder,
    responseMessages,
    onStatusChange: (record) => onStatusChange({ record, updateOrderStatusWrapper }),
  }), [allOrder, allOrderLoading, responseMessages, updateOrderStatusWrapper]);
};

export default () => {};
