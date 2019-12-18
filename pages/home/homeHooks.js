import {
  useEffect, useMemo,
useState,
} from 'react';

import { getAllProductBySSE } from '/services/product';
// import {
//   getProfile,
//   initializeLiff,
// } from '/utils/liff';
import { useResponseMessage } from '/utils/useResponseMessage';

export const useHome = () => {
  const { responseMessages, appendResponseMessage } = useResponseMessage();
  const [ productList, setProductList ] = useState();
  const [ listening, setListening ] = useState(false);

  // const liffApp = initializeLiff();

  useEffect(() => {
    if (!listening) {
      try {
        getAllProductBySSE({ setProductList });
        setListening(true);
      } catch (err) {
        appendResponseMessage({ msg: `There is an error during get products ${err}` });
      }
    }
  }, [appendResponseMessage, listening]);

  return useMemo(() => ({
    productList,
    responseMessages,
  }), [productList, responseMessages]);
};

export default () => {};
