'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.belongsTo(models.Category, {
        foreignKey: 'ProductId',
      });

      ProductCategory.belongsTo(models.Product, {
        foreignKey: 'ProductId',
      });
    }
  }

  ProductCategory.init(
    {
      ProductId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ProductCategory',
    },
  );
  return ProductCategory;
};
