'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsToMany(models.Item, {
        foreignKey: 'cartId', // Cart.addItem(), getItems()
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
