'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemInventory extends Model {
    static associate(models) {
      this.belongsTo(models.Item, { foreignKey: 'itemId' });
    }
  }

  ItemInventory.init(
    {
      itemInventoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      count: {
        type: DataTypes.STRING,
        // allowNull: false, // 필수
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ItemInventory',
    }
  );

  return ItemInventory;
};
