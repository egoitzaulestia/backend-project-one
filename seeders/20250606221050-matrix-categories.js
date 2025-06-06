'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'Neurolink Tech',
        description: 'Brain-machine interfaces and consciousness I/O.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hovercraft Systems',
        description: 'Power, propulsion and life-support for Zion vessels.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Anti-Machine Weaponry',
        description: 'Arms designed to neutralise Sentinels and Agents.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Command & Control',
        description: 'Broadcast-depth consoles and comms infrastructure.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Electro-Mag Ordinance',
        description: 'EMP-based offensive or defensive hardware.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
