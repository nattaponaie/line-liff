import { get } from 'lodash';

import { getRequest } from '/utils/httpHelper';
import {
  API_PREFIX, SSE_GET_PRODUCT_EVENT,
} from '/web-config';

const getAllProduct = async () => {
  try {
    return await getRequest({
      path: 'products',
    });
  } catch (err) {
    throw err;
  }
};

const getAllProductBySSE = ({ allProductWrapper }) => {
  const sseUrl = `${API_PREFIX}/v1.0/products/sse`;
  const eventSource = new EventSource(sseUrl);
  const eventName = SSE_GET_PRODUCT_EVENT;

  eventSource.addEventListener(eventName, (result) => {
    const data = get(JSON.parse(result.data), 'attributes');
    allProductWrapper(() => data);
  });
};

export {
  getAllProduct,
  getAllProductBySSE,
};
