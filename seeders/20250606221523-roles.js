'use strict';

module.exports = {
  async up(queryInterface) {
    // Explicitly set IDs (1, 2, 3) so they match your app logic
    return queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: 1,
          name: 'user',
          description: 'Standard registered user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'admin',
          description: 'Site administrator with elevated privileges',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'superadmin',
          description: 'Highest-level administrator (full access)',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    // Remove all three role rows
    return queryInterface.bulkDelete(
      'Roles',
      {
        id: [1, 2, 3],
      },
      {},
    );
  },
};
