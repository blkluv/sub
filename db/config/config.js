require('dotenv').config({ path: '.env.local' });
const URL = require('url');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const parseURL = (databaseURL) => {
  let URLObj = URL.parse(databaseURL);
  let [username, password] = URLObj.auth.split(':');
  return {
    username,
    password,
    host: URLObj.hostname,
    port: URLObj.port,
    database: URLObj.path.split('/')[1],
    dialect: 'postgres',
    ssl: true
  };
};

module.exports = {
  development: Object.assign(
    {dialectOptions: {ssl: true}, logging: console.log},
    parseURL(process.env.DB_CONNECTION_STRING)
  ),
  test: Object.assign(
    {dialectOptions: {ssl: true}, logging: console.log},
    parseURL(process.env.DB_CONNECTION_STRING)
  ),
  production: Object.assign(
    {dialectOptions: {ssl: true}, logging: console.log},
    parseURL(process.env.DB_CONNECTION_STRING)
  ),
};