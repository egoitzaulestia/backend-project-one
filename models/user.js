'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
        validate: {
          notNull: { msg: 'Introduce your email, please' },
          isEmail: { msg: 'Introduce a valid email, please' },
        },
      },
      password: DataTypes.STRING,
      RoleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );

  return User;
};
