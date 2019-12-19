import getConfig from 'next/config';

export const {
  publicRuntimeConfig: {
    ASSET_PREFIX,
    API_PREFIX,
    NODE_ENV,
    PORT,
    AXIOS_TIMEOUT,
    LIFF_ID,
    SSE_GET_PRODUCT_EVENT,
    SSE_GET_ORDER_EVENT,
    SSE_GET_ORDER_TRANSACTION_EVENT,
    SERVER_ENDPOINT_HOST,
    LINE_LIFF_ENABLE,
    MOCK_LINE_ID,
  },
} = getConfig();
