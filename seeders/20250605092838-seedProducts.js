'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        name: 'Nacidos de la bruma',
        description: 'Libro de fantasía',
        price: 330,
        imageUrl: 'img.jpg',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
  }
};
