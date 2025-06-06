'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

      Review.belongsTo(models.Product, {
        foreignKey: 'ProductId',
      });
    }
  }
  Review.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Introduce a title, please' },
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Introduce a review, please' },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Rate the product, please' },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
    },
  );
  return Review;
};
