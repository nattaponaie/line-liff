import { message } from 'antd';
import { get } from 'lodash';
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { UserContext } from '/contexts/UserContext';
import { getAllProductBySSE } from '/services/product';
import {
  getProfile, initializeLiff,
} from '/utils/liff';
import { useLoadingState } from '/utils/useLoadingState';
import { useResponseMessage } from '/utils/useResponseMessage';

export const useHome = () => {
  const { responseMessages, appendResponseMessage } = useResponseMessage();
  const [ productList, setProductList ] = useState();
  const [ listening, setListening ] = useState(false);
  const { dispatch } = useContext(UserContext);

  const [
    lineProfileLoading,
    lineProfile,
    lineProfileWrapper,
  ] = useLoadingState(null);

  useEffect(() => {

    lineProfileWrapper(async () => {
      try {
        const liff = window.liff;
        initializeLiff({ liff });
        const profile = await getProfile({ liff });
        dispatch({
          type: 'info',
          userinfo: {
            lineUserId: get(profile, 'lineUserId'),
            displayName: get(profile, 'displayName'),
            pictureUrl: get(profile, 'pictureUrl'),
          },
        });
        return profile;
      } catch (err) {
        message.error(`There is an error during initialize LINE LIFF ${err}`);
      }
    });

    if (!listening) {
      try {
        getAllProductBySSE({ setProductList });
        setListening(true);
      } catch (err) {
        appendResponseMessage({ msg: `There is an error during get products ${err}` });
      }
    }
  }, [appendResponseMessage, dispatch, lineProfileWrapper, listening]);

  return useMemo(() => ({
    lineProfile,
    productList,
    responseMessages,
  }), [lineProfile, productList, responseMessages]);
};

export default () => {};
