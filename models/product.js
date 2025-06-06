'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Introduce product name, please',
          },
          notEmpty: {
            msg: 'Introduce product name, please',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Introduce product description, please',
          },
          notEmpty: {
            msg: 'Introduce product description, please',
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Introduce product price, please',
          },
          isInt: {
            msg: 'Introduce product price, please',
          },
          min: {
            args: [0],
            msg: 'Price must be 0 or greater',
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Must be a valid URL',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Introduce product stock, please',
          },
          isInt: {
            msg: 'Introduce product stock, please',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );

  return Product;
};
