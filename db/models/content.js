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
      content.hasOne(models.users, {
        foreignKey: 'pinata_user_id',
        sourceKey: 'pinata_user_id'
      });
    }
  }
  content.init({
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
    paranoid: true
  });
  return content;
};