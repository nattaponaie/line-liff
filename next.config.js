const { parsed: environment } = require('dotenv').config();
const { EnvironmentPlugin } = require('webpack');
const withSass = require('@zeit/next-sass');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const withNextAntdLess = require('./next-antd-less.config');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './styles/antd-custom.less'), 'utf8'),
);

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => { };
}

module.exports = {
  ...withSass(withNextAntdLess({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    },
    webpack: (nextConfig) => {
      nextConfig.plugins.push(new EnvironmentPlugin(environment));
      nextConfig.module.rules.push({
        test: /\.scss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles'],
            },
          },
        ],
      });
      return nextConfig;
    },
  })),
  serverRuntimeConfig: { // will only be available on the server side
    NODE_ENV: process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 3000,
  },
  publicRuntimeConfig: { // will be available on both server and client
    ASSET_PREFIX: process.env.ASSET_PREFIX || '',
    API_PREFIX: process.env.API_PREFIX || 'https://line-liff-challenge.herokuapp.com/api',
    AXIOS_TIMEOUT: process.env.AXIOS_TIMEOUT || 50000,
    LIFF_ID: process.env.LIFF_ID || '1653655380-2GWbJ4NN',
    SSE_GET_PRODUCT_EVENT: process.env.SSE_GET_PRODUCT_EVENT || 'get-all-products',
    SSE_GET_ORDER_TRANSACTION_EVENT: process.env.SSE_GET_ORDER_TRANSACTION_EVENT || 'get-all-order-transactions',
    SSE_GET_ORDER_EVENT: process.env.SSE_GET_ORDER_EVENT || 'get-all-orders',
    SERVER_ENDPOINT_HOST: process.env.SERVER_ENDPOINT_HOST || 'https://line-liff-challenge.herokuapp.com/',
    LINE_LIFF_ENABLE: process.env.LINE_LIFF_ENABLE || true,
    MOCK_LINE_ID: process.env.MOCK_LINE_ID || 'linemock123',
  },
};
