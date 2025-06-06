'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: models.ProductCategory,
        foreignKey: 'CategoryId',
        otherKey: 'ProductId',
      });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: 'Insert category name, please' },
          notNull: { msg: 'Insert category name, please' },
        },
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
  return Category;
};
