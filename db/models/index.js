'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const config = require('../config/config');
const {EnvVars} = require("../../../../pinata/pinata-managed/src/enums");
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log(config);
  sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {dialectOptions: {ssl: true}, ssl: true});
  // sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const files = require.context('./', false, /\.js$/i);
files.keys().forEach(key => {
  if(key.includes('index')){
    return
  }
  const model = files(key)(sequelize, Sequelize.DataTypes)
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
