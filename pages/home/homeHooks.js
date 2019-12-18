import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getAllProductBySSE } from '/services/product';
import { initializeLiff } from '/utils/liff';
import { useLoadingState } from '/utils/useLoadingState';
import { useResponseMessage } from '/utils/useResponseMessage';

export const useHome = () => {
  const { responseMessages, appendResponseMessage } = useResponseMessage();
  const [ productList, setProductList ] = useState([]);
  const [ listening, setListening ] = useState(false);

  const [
    liffAppLoading,
    liffApp,
    liffAppWrapper,
  ] = useLoadingState(null);

  useEffect(() => {

    liffAppWrapper(async () => {
      try {
        const liff = window.liff;
        const liffApp = await initializeLiff({ liff });
        return liffApp;
      } catch (err) {
        console.log('err', err);
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
  }, [appendResponseMessage, liffAppWrapper, listening]);

  return useMemo(() => ({
    productList,
    responseMessages,
  }), [productList, responseMessages]);
};

export default () => {};
