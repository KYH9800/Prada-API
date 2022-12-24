'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemOption extends Model {
    static associate(models) {
      this.hasOne(models.Item, { foreignKey: 'itemId' });
      this.hasOne(models.ItemInventory, { foreignKey: 'itemInventoryId' });
    }
  }

  ItemOption.init(
    {
      itemOptionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Item',
          key: 'itemId',
        },
        onDelete: 'CASCADE', //! 이거 확인하기: 따라서 삭제가 되는지
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ItemOption',
    }
  );

  return ItemOption;
};
