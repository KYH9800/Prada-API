'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemInformation extends Model {
    static associate(models) {
      this.hasOne(models.Item, { foreignKey: 'itemId' });
    }
  }

  ItemInformation.init(
    {
      itemInformationId: {
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
        onDelete: 'CASCADE',
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      material: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ItemInformation',
    }
  );

  return ItemInformation;
};
