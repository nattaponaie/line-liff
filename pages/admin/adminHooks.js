import { message } from 'antd';
import { get } from 'lodash';
import {
  useEffect, useMemo, useState,
} from 'react';

import { updateOrderStatus } from '/services/order';
import {
  getAllOrder, getAllOrderBySSE,
} from '/services/order-transaction';
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

export const useAdminUpdate = () => {
  const [
    updateOrderStatusLoading,
    updateOrderStatusResult,
    updateOrderStatusWrapper,
  ] = useLoadingState(null);

  return useMemo(() => ({
    updateOrderStatusLoading,
    updateOrderStatusResult,
    onStatusChange: (record) => onStatusChange({ record, updateOrderStatusWrapper }),
  }), [updateOrderStatusLoading, updateOrderStatusResult, updateOrderStatusWrapper]);
};

export const useAdmin = () => {
  const { responseMessages, appendResponseMessage } = useResponseMessage();

  const [
    allOrderLoading,
    allOrder,
    allOrderWrapper,
  ] = useLoadingState(null);

   useEffect(() => {
    allOrderWrapper(async () => {
      try {
        return await getAllOrder();
      } catch (err) {
        appendResponseMessage({ msg: `There is an error during get all orders ${err}` });
      }
    });
  }, [allOrderWrapper, appendResponseMessage]);

  return useMemo(() => ({
    allOrderLoading,
    allOrder,
    responseMessages,
    appendResponseMessage,
    allOrderWrapper,
  }), [allOrder, allOrderLoading, allOrderWrapper, appendResponseMessage, responseMessages]);
};

export const useAdminSSE = ({ appendResponseMessage, allOrderWrapper }) => {
  const [ listening, setListening ] = useState(false);
  if (!listening) {
    try {
      setListening(true);
      getAllOrderBySSE({ allOrderWrapper });
    } catch (err) {
      appendResponseMessage({ msg: `There is an error during get all orders by using SSE ${err}` });
    }
  }
};

export default () => {};
