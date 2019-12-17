import getConfig from 'next/config';

export const {
  publicRuntimeConfig: {
    ASSET_PREFIX,
    API_PREFIX,
    NODE_ENV,
    PORT,
    AXIOS_TIMEOUT,
  },
} = getConfig();
