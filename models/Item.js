'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.hasOne(models.ItemInformation, { foreignKey: 'itemId' });

      this.hasMany(models.ItemColor, { foreignKey: 'itemId' });
      this.hasMany(models.OptionImage, { foreignKey: 'itemId' });
      this.hasMany(models.OptionSize, { foreignKey: 'itemId' });

      this.belongsTo(models.AdminUser, { foreignKey: 'adminUserId' });
      this.belongsTo(models.ItemDetail, { foreignKey: 'itemDetailId' });

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
