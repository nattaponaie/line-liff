import { message } from 'antd';
import { isNil } from 'lodash';
import {
  useContext, useMemo,
} from 'react';

import { UserContext } from '/contexts/UserContext';
import { postOrder } from '/services/order';
import { useLoadingState } from '/utils/useLoadingState';
import { useResponseMessage } from '/utils/useResponseMessage';

export const onProductClick = ({
  productId,
  createOrderWrapper,
  appendResponseMessage,
  state,
}) => async () => {
  if (isNil(state.lineUserId)) {
    message.error('Please login first!');
    return;
  }
  createOrderWrapper(async () => {
    try {
      const result = await postOrder({
        productId,
        appendResponseMessage,
        lineUserId: state.lineUserId,
        displayName: state.displayName,
      });
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

  const { state } = useContext(UserContext);

  const [
    createOrderLoading,
    createOrder,
    createOrderWrapper,
  ] = useLoadingState(null);

  return useMemo(() => ({
    createOrderLoading,
    createOrder,
    responseMessages,
    onProductClick: onProductClick({ productId, createOrderWrapper, appendResponseMessage, state }),
  }), [createOrderLoading, createOrder, responseMessages, productId, createOrderWrapper, appendResponseMessage, state]);
};

export default () => {};
