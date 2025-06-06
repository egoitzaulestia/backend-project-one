'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('products', [
      {
        name: 'Neural Jack Interface',
        description: 'Surgical-grade cranial socket for Matrix immersion.',
        price: 4500,
        imageUrl: 'neural-jack.jpg',
        stock: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hovercraft Power Cell',
        description: 'Cold-fusion energy module for Mjolnir-class ships.',
        price: 12000,
        imageUrl: 'power-cell.jpg',
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sentinel Disruptor Rifle',
        description: 'Coil-gun firing EMP-tipped flechettes.',
        price: 7250,
        imageUrl: 'disruptor-rifle.jpg',
        stock: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Operator Console Mk II',
        description: 'Hardened terminal for broadcast-depth navigation.',
        price: 9800,
        imageUrl: 'operator-console.jpg',
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Portable EMP Charge',
        description: 'Single-use electromagnetic pulse field device.',
        price: 2100,
        imageUrl: 'portable-emp.jpg',
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('products', null, {});
  },
};
