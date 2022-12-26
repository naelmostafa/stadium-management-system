export const database = {
  HOST: process.env.DB_HOST,
  DATABASE: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  // DIALECT: process.env.DB_DIALECT,
};

export const AppConstants = {
  PORT: process.env.PORT,
  API_PREFIX: '/api/v1/',
};
