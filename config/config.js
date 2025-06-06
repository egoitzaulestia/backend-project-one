// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USER_DB_DEV,
    password: process.env.PASS_DB_DEV,
    database: process.env.NAME_DB_DEV,
    host: process.env.HOST_DB_DEV,
    dialect: 'mysql',
    jwt_secret: process.env.JWT_SECRET_DEV,
    credentials: {
      user: process.env.NM_EMAIL_USER,
      pass: process.env.NM_EMAIL_PASS,
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
