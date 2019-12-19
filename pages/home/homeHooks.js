import { message } from 'antd';
import { get } from 'lodash';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { UserContext } from '/contexts/UserContext';
import { updateOrderStatus } from '/services/order';
import { getOrderByLineUserIdSSE } from '/services/order-transaction';
import {
  getAllProduct, getAllProductBySSE,
} from '/services/product';
import { transformStatusId } from '/utils/constants/order-status';
import {
  getProfile, initializeLiff,
} from '/utils/liff';
import { useLoadingState } from '/utils/useLoadingState';
import { useResponseMessage } from '/utils/useResponseMessage';
import { LINE_LIFF_ENABLE } from '/web-config';

export const useHome = () => {
  const { responseMessages, appendResponseMessage } = useResponseMessage();
  const { dispatch } = useContext(UserContext);

  const [
    lineProfileLoading,
    lineProfile,
    lineProfileWrapper,
  ] = useLoadingState(null);

  const [
    allProductLoading,
    allProduct,
    allProductWrapper,
  ] = useLoadingState(null);

  useEffect(() => {

    if (LINE_LIFF_ENABLE === true) {
      lineProfileWrapper(async () => {
        try {
          const liff = window.liff;
          initializeLiff({ liff });
          const profile = await getProfile({ liff });

          dispatch({
            type: 'info',
            userinfo: {
              lineUserId: get(profile, 'userId'),
              displayName: get(profile, 'displayName'),
              pictureUrl: get(profile, 'pictureUrl'),
            },
          });
          return profile;
        } catch (err) {
          message.error(`There is an error during initialize LINE LIFF ${err}`);
        }
      });
    }

    allProductWrapper(async () => {
      try {
        return await getAllProduct();
      } catch (err) {
        message.error(`There is an error during get all product ${err}`);
      }
    });

  }, [allProductWrapper, appendResponseMessage, dispatch, lineProfileWrapper]);

  return useMemo(() => ({
    lineProfile,
    allProductLoading,
    allProduct,
    allProductWrapper,
    responseMessages,
    appendResponseMessage,
  }), [allProduct, allProductLoading, allProductWrapper, appendResponseMessage, lineProfile, responseMessages]);
};

export const useHomeSSE = ({ appendResponseMessage, allProductWrapper }) => {
  const [ listening, setListening ] = useState(false);

  useEffect(() => {

    if (!listening) {
      try {
        getAllProductBySSE({ allProductWrapper });
        setListening(true);
      } catch (err) {
        appendResponseMessage({ msg: `There is an error during get all products by SSE ${err}` });
      }
    }
  }, [allProductWrapper, appendResponseMessage, listening]);
};

export const servedProduct = ({ product }) => {
  if (!product) return;
  const productName = get(product, 'name', 'none');
  message.success(`${productName} has been served`);
};

export const validateServedOrder = ({
  servedOrder,
  setServedOrder,
  orderList,
}) => {
  orderList.forEach((item) => {
    const order = get(item, 'order');
    if (order) {
      const statusName = transformStatusId(order.status);
      if (statusName === 'served' && !servedOrder.find((item) => item.id === order.id)) {
        const clone = [...servedOrder];
        clone.push(order);
        setServedOrder(clone);

        servedProduct({ product: item.product });
      }
    }
  });
};

export const useHomeOrderSSE = ({ appendResponseMessage }) => {
  const [ listening, setListening ] = useState(false);
  const [ userOrder, setUserOrder ] = useState([]);
  const [ servedOrder, setServedOrder ] = useState([]);
  const { state } = useContext(UserContext);

  const [
    requestUpdateOrderStatusLoading,
    requestUpdateOrderStatus,
    requestUpdateOrderStatusWrapper,
  ] = useLoadingState(null);

  useEffect(() => {
    // if (LINE_LIFF_ENABLE === true && !listening && state.lineUserId) {
    if (!listening) {
      try {
        getOrderByLineUserIdSSE({ lineUserId: state.lineUserId || 'wqewe2e25', appendResponseMessage, setUserOrder });
        setListening(true);
      } catch (err) {
        message.error(`There is an error during get order SSE ${err}`);
      }
    }
  }, [appendResponseMessage, listening, state.lineUserId]);

  useEffect(() => {
    validateServedOrder({ servedOrder, setServedOrder, orderList: userOrder });
    Promise.all(servedOrder.map(async (order) => {
      requestUpdateOrderStatusWrapper(async () => {
        try {
          const orderId = get(order, 'id');
          const result = await updateOrderStatus({ orderId, status: 'received' });
          return result;
        } catch (err) {
          message.error(`There is an error during updated order status ${err}`);
        }
      });
    }));
  }, [requestUpdateOrderStatusWrapper, servedOrder, userOrder]);

  return useMemo(() => ({
    userOrder,
  }), [userOrder]);
};

export default () => {};
