'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemColor extends Model {
    static associate(models) {
      this.hasMany(models.OptionImage, { foreignKey: 'itemColorId' });
      this.belongsTo(models.Item, { foreignKey: 'itemId'  });
    }
  }

  ItemColor.init(
    {
      itemColorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ItemColor',
    }
  );

  return ItemColor;
};
