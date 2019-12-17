import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const {
  PORT = env.PORT || 3000,
  NODE_ENV = env.NODE_ENV || 'production',
  DATABASE_URL = env.DATABASE_URL || 'localhost',
  DATABASE_NAME = env.DATABASE_NAME || 'line-liff',
  DATABASE_USERNAME = env.DATABASE_USERNAME || 'api',
  DATABASE_PASSWORD = env.DATABASE_PASSWORD || 'api',
  DATABASE_PORT = env.DATABASE_PORT || 5432,
  DATABASE_DIALECT = env.DATABASE_DIALECT || 'postgres',
  SERVER_OPEN_SWAGGER = env.SERVER_OPEN_SWAGGER || true,
  SERVER_ENDPOINT_HOST = env.SERVER_ENDPOINT_HOST || 'localhost',
  SERVER_ENDPOINT_PORT = env.PORT,
  SERVER_ENDPOINT_SCHEME = env.SERVER_ENDPOINT_SCHEME || 'http',
} = env;
