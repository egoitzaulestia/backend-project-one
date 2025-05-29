'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      title: DataTypes.STRING,
      comment: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    },
  );

  return Review;
};
