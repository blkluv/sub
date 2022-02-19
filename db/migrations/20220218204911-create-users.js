'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      pinata_user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      pinata_submarine_key: {
        type: Sequelize.STRING
      },
      pinata_gateway_subdomain: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('users');
  }
};