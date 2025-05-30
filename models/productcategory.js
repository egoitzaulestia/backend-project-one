'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCategory.belongsTo(models.Category, {
        foreignKey: 'CategoryId',
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
