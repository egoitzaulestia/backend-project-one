'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('ProductCategories', {
      fields: ['ProductId', 'CategoryId'],
      type: 'unique',
      name: 'unique_product_category',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'ProductCategories',
      'ProductCategories_ibfk_1',
    );
    await queryInterface.removeConstraint(
      'ProductCategories',
      'ProductCategories_ibfk_2',
    );
    await queryInterface.removeConstraint(
      'ProductCategories',
      'unique_product_category',
    );
    await queryInterface.dropTable('ProductCategories');
  },
};
