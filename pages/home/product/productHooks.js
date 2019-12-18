import { message } from 'antd';
import { useMemo } from 'react';

import { postOrder } from '/services/order';
import { useLoadingState } from '/utils/useLoadingState';
import { useResponseMessage } from '/utils/useResponseMessage';

export const onProductClick = ({
  productId,
  createOrderWrapper,
  appendResponseMessage,
}) => async () => {
  createOrderWrapper(async () => {
    try {
      const result = await postOrder({ productId, appendResponseMessage });
      appendResponseMessage({ msg: 'success' });
      message.success('Order has been sent successfully!');
      return result;
    } catch (err) {
      message.error(`There is an error during create order ${err}`);
      appendResponseMessage({ msg: `There is an error during create order ${err}` });
    }
  });
};

export const useProduct = ({ productId }) => {
  const { responseMessages, appendResponseMessage } = useResponseMessage();

  const [
    createOrderLoading,
    createOrder,
    createOrderWrapper,
  ] = useLoadingState(null);

  return useMemo(() => ({
    createOrderLoading,
    createOrder,
    responseMessages,
    onProductClick: onProductClick({ productId, createOrderWrapper, appendResponseMessage }),
  }), [appendResponseMessage, createOrder, createOrderLoading, createOrderWrapper, responseMessages, productId]);
};

export default () => {};
