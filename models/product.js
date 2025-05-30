'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: models.ProductCategory,
        foreignKey: 'ProductId',
        otherKey: 'CategoryId',
      });

      Product.belongsToMany(models.Order, {
        through: models.OrderItem,
        foreignKey: 'ProductId',
        otherKey: 'OrderId',
      });

      Product.hasMany(models.Review, {
        foreignKey: 'ProductId',
      });
    }
  }

  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );

  return Product;
};
