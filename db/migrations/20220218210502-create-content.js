'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contents', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      submarine_cid: {
        type: Sequelize.STRING
      },
      unlock_info: {
        type: Sequelize.JSONB
      },
      short_id: {
        unique: true,
        type: Sequelize.STRING
      },
      pinata_user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'pinata_user_id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contents');
  }
};