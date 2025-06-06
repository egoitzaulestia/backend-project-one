'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Look up IDs inserted in previous seeders
    const [products] = await queryInterface.sequelize.query(
      `SELECT id, name FROM products WHERE name IN
       ('Neural Jack Interface',
        'Hovercraft Power Cell',
        'Sentinel Disruptor Rifle',
        'Operator Console Mk II',
        'Portable EMP Charge');`,
    );
    const [categories] = await queryInterface.sequelize.query(
      `SELECT id, name FROM categories WHERE name IN
       ('Neurolink Tech',
        'Hovercraft Systems',
        'Anti-Machine Weaponry',
        'Command & Control',
        'Electro-Mag Ordinance');`,
    );

    // helper to grab IDs by name
    const pid = (n) => products.find((p) => p.name === n).id;
    const cid = (n) => categories.find((c) => c.name === n).id;

    return queryInterface.bulkInsert('ProductCategories', [
      {
        productId: pid('Neural Jack Interface'),
        categoryId: cid('Neurolink Tech'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: pid('Hovercraft Power Cell'),
        categoryId: cid('Hovercraft Systems'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: pid('Sentinel Disruptor Rifle'),
        categoryId: cid('Anti-Machine Weaponry'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: pid('Operator Console Mk II'),
        categoryId: cid('Command & Control'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: pid('Portable EMP Charge'),
        categoryId: cid('Electro-Mag Ordinance'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('ProductCategories', null, {});
  },
};
