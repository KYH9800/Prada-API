'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.hasOne(models.ItemInformation, { foreignKey: 'itemId' });
      this.hasMany(models.ItemOption, { foreignKey: 'itemId' });
      this.belongsTo(models.AdminUser, { foreignKey: 'adminUserId' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.belongsToMany(models.WishList, {
        foreignKey: 'itemId',
        through: 'WishListItem',
      });
      this.belongsToMany(models.Cart, {
        foreignKey: 'itemId',
        through: 'CartItemList',
      });
      this.belongsToMany(models.OrderList, {
        foreignKey: 'itemId',
        through: 'OrderListItem',
      });
    }
  }

  Item.init(
    {
      itemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );

  return Item;
};
