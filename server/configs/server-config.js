import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const {
  PORT = env.PORT || 3000,
  NODE_ENV = env.NODE_ENV || 'production',
  DATABASE_HOST = env.DATABASE_HOST,
  DATABASE_NAME = env.DATABASE_NAME,
  DATABASE_USERNAME = env.DATABASE_USERNAME,
  DATABASE_PASSWORD = env.DATABASE_PASSWORD,
  DATABASE_PORT = env.DATABASE_PORT || 5432,
  DATABASE_DIALECT = env.DATABASE_DIALECT || 'postgres',
  SERVER_OPEN_SWAGGER = env.SERVER_OPEN_SWAGGER || false,
  SERVER_ENDPOINT_HOST = env.SERVER_ENDPOINT_HOST || 'https://line-liff-challenge.herokuapp.com/',
  SERVER_ENDPOINT_PORT = env.PORT,
  SERVER_ENDPOINT_SCHEME = env.SERVER_ENDPOINT_SCHEME || 'https',
  SSE_GET_PRODUCT_EVENT = env.SSE_GET_PRODUCT_EVENT || 'get-all-products',
  SSE_GET_ORDER_EVENT = env.SSE_GET_ORDER_EVENT || 'get-all-orders',
  SSE_GET_ORDER_TRANSACTION_EVENT = env.SSE_GET_ORDER_TRANSACTION_EVENT || 'get-all-order-transactions',
  LINE_LIFF_ENABLE = env.LINE_LIFF_ENABLE || true,
} = env;
