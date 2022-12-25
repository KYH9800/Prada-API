'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemOption extends Model {
    static associate(models) {
      this.belongsTo(models.Item, { foreignKey: 'itemId' });
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
