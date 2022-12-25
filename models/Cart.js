'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.hasOne(models.User, { foreignKey: 'userId' });
      // this.hasMany(models.Item, { foreignKey: 'itemId' });
      this.belongsToMany(models.Item, {
        foreignKey: 'cartId',
        through: 'CartItemList',
      });
    }
  }

  Cart.init(
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
      modelName: 'Cart',
    }
  );

  return Cart;
};
