'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemInformation extends Model {
    static associate(models) {
      this.belongsTo(models.Item, { foreignKey: 'itemId' });
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
