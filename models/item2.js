'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item2 extends Model {
    static associate(models) {
      this.hasOne(models.ItemInformation2, { foreignKey: 'itemId' });
      this.hasMany(models.ItemOption2, { foreignKey: 'itemId' });

      this.belongsTo(models.AdminUser2, { foreignKey: 'adminUserId2' });
      this.belongsTo(models.Category, { foreignKey: 'themeId' });

      this.belongsToMany(models.WishList2, {
        foreignKey: 'itemId',
        through: 'WishListItem',
      });
      this.belongsToMany(models.Cart2, {
        foreignKey: 'itemId',
        through: 'CartItemList',
      });
      this.belongsToMany(models.OrderList2, {
        foreignKey: 'itemId',
        through: 'OrderListItem',
      });
    }
  }

  Item2.init(
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
      modelName: 'Item2',
    }
  );

  return Item2;
};
