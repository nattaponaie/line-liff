import { message } from 'antd';
import { get } from 'lodash';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { UserContext } from '/contexts/UserContext';
import {
  getAllProduct, getAllProductBySSE,
} from '/services/product';
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

export default () => {};
