'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart2 extends Model {
    static associate(models) {
      this.hasOne(models.User, { foreignKey: 'userId' });
      // this.hasMany(models.Item, { foreignKey: 'itemId' });
      this.belongsToMany(models.Item2, {
        foreignKey: 'cartId',
        through: 'CartItemList',
      });
    }
  }

  Cart2.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      count: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cart2',
    }
  );

  return Cart2;
};
