'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      clientId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      deliveryPersonId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      total: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      google_maps_location: {
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
    await queryInterface.dropTable('Orders');
  }
};