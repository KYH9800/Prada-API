'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemInformation2 extends Model {
    static associate(models) {
      this.belongsTo(models.Item2, { foreignKey: 'itemId' });
    }
  }

  ItemInformation2.init(
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
      modelName: 'ItemInformation2',
    }
  );

  return ItemInformation2;
};
