'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  content.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    submarine_cid: DataTypes.STRING,
    unlock_info: DataTypes.JSONB,
    short_id: DataTypes.STRING,
    pinata_user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'content',
  });
  return content;
};