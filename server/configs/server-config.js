import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const {
  PORT = env.PORT || 3000,
  NODE_ENV = env.NODE_ENV || 'production',
} = env;
