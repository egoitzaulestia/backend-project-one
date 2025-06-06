'use strict';
const { Model } = require('sequelize');
const { default: ModelManager } = require('sequelize/lib/model-manager');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'RoleId',
      });

      User.hasMany(models.Order, {
        foreignKey: 'UserId',
      });

      User.hasMany(models.Review, {
        foreignKey: 'UserId',
      });

      User.hasMany(models.Token, {
        foreignKey: 'UserId',
      });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Introduce your name, please' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Introcude your email, please' },
          isEmail: { msg: 'Introduce a valid email, please' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Establish a password, please' },
        },
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
      },
      RoleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
