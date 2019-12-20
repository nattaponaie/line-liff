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
  getProfile, initializeLiff, sendMessage,
} from '/utils/liff';
import { useLoadingState } from '/utils/use-loading-state';
import { useResponseMessage } from '/utils/use-response-message';
import {
  LINE_LIFF_ENABLE, MOCK_LINE_ID,
} from '/web-config';

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
          await initializeLiff({ liff });
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
    } else {
      dispatch({
        type: 'info',
        userinfo: {
          lineUserId: MOCK_LINE_ID,
          displayName: MOCK_LINE_ID,
          pictureUrl: MOCK_LINE_ID,
        },
      });
    }
  }, [dispatch, lineProfileWrapper]);

  useEffect(() => {
    allProductWrapper(async () => {
      try {
        return await getAllProduct();
      } catch (err) {
        message.error(`There is an error during get all product ${err}`);
      }
    });

  }, [allProductWrapper]);

  return useMemo(() => ({
    lineProfileLoading,
    lineProfile,
    allProductLoading,
    allProduct,
    allProductWrapper,
    responseMessages,
    appendResponseMessage,
  }), [allProduct, allProductLoading, allProductWrapper, appendResponseMessage, lineProfile, lineProfileLoading, responseMessages]);
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
  const liff = window.liff;
  const message = `${productName} has been served`;
  sendMessage({ liff, msg: message });
};

export const validateServedOrder = ({
  servedOrder,
  setServedOrder,
  orderList,
  requestUpdateOrderListWrapper,
}) => {
  Promise.all(orderList.map(async (item) => {
    const order = get(item, 'order');
    if (order) {
      const statusName = transformStatusId(get(order, 'status'));
      if (statusName === 'served' && !servedOrder.find((item) => item.id === order.id)) {
        const clone = [...servedOrder];
        clone.push(order);
        setServedOrder(clone);

        requestUpdateOrderListWrapper(async () => {
          try {
            const orderId = get(order, 'id');
            const result = await updateOrderStatus({ orderId, status: 'received' });
            return result;
          } catch (err) {
            message.error(`There is an error during updated order status ${err}`);
          }
        });

        servedProduct({ product: item.product });
      }
    }
  }));
};

export const useHomeOrderSSE = ({ appendResponseMessage }) => {
  const [ listening, setListening ] = useState(false);
  const [ userOrder, setUserOrder ] = useState([]);
  const [ servedOrder, setServedOrder ] = useState([]);
  const { state } = useContext(UserContext);

  const [
    requestUpdateOrderListLoading,
    requestUpdateOrderList,
    requestUpdateOrderListWrapper,
  ] = useLoadingState(null);

  useEffect(() => {
    if (!listening && state.lineUserId) {
      try {
        getOrderByLineUserIdSSE({ lineUserId: state.lineUserId, appendResponseMessage, setUserOrder });
        setListening(true);
      } catch (err) {
        message.error(`There is an error during get order SSE ${err}`);
      }
    }
  }, [appendResponseMessage, listening, state.lineUserId]);

  useEffect(() => {
    validateServedOrder({
      servedOrder,
      setServedOrder,
      orderList: userOrder,
      requestUpdateOrderListWrapper,
    });
  }, [requestUpdateOrderListWrapper, servedOrder, userOrder]);

  return useMemo(() => ({
    requestUpdateOrderListLoading,
    requestUpdateOrderList,
    userOrder,
  }), [requestUpdateOrderList, requestUpdateOrderListLoading, userOrder]);
};

export default () => {};
