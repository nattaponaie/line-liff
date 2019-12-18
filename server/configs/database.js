const dotenv = require('dotenv');

dotenv.config();

const { env } = process;
const dbPort = env.DATABASE_PORT || '5432';
const dialect = env.DATABASE_DIALECT || 'postgres';
const dbUrl = env.DATABASE_URL || `postgres://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`;

module.exports = {
  development: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    port: dbPort,
    dialect,
    dbUrl,
  },
  test: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    port: dbPort,
    dialect,
    dbUrl,
  },
  staging: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    port: dbPort,
    dialect,
    dbUrl,
  },
  production: {
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    port: dbPort,
    dialect,
    dbUrl,
  },
};
