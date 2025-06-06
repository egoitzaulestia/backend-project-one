'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, {
        foreignKey: 'OrderId',
      });

      OrderItem.belongsTo(models.Product, {
        foreignKey: 'ProductId',
      });
    }
  }

  OrderItem.init(
    {
      OrderId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      unitPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderItem',
    },
  );
  return OrderItem;
};
