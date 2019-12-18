import { message } from 'antd';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';

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
        console.log('profile', profile);
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
  }, [appendResponseMessage, lineProfileWrapper, listening]);

  return useMemo(() => ({
    lineProfile,
    productList,
    responseMessages,
  }), [lineProfile, productList, responseMessages]);
};

export default () => {};
