import { useEffect } from 'react';

import { getAllProduct } from '/services/product';
import { useErrorMessage } from '/utils/useErrorMessage';
import { useLoadingState } from '/utils/useLoadingState';

export const useHome = () => {
  const { errorMessages, appendErrorMessage } = useErrorMessage();
  const [
    allProductLoading,
    allProduct,
    requestAllProductWrapper,
  ] = useLoadingState(null);

  useEffect(() => {
    requestAllProductWrapper(async () => {
      const result = await getAllProduct({ appendErrorMessage });
      return result;
    });
  }, [appendErrorMessage, requestAllProductWrapper]);

  return {
    allProductLoading,
    allProduct,
    errorMessages,
  };
};

export default () => {};
