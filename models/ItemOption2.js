'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemOption2 extends Model {
    static associate(models) {
      this.belongsTo(models.Item2, { foreignKey: 'itemId' });
    }
  }

  ItemOption2.init(
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
      modelName: 'ItemOption2',
    }
  );

  return ItemOption2;
};
