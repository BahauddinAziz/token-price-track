'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Bahauddin',
        email: 'bahauddinaziz@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tokens', [
      {
        id: 1,
        name: 'etherium',
        shortCode: 'ETH'
      },
      {
        id: 2,
        name: 'polygon',
        shortCode: 'POL'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tokens', null, [])
    await queryInterface.bulkDelete('users', null, [])
  }
};
