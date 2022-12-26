'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OptionSize extends Model {
    static associate(models) {
      this.belongsTo(models.ItemColor, { foreignKey: 'itemColorId' });
    }
  }

  OptionSize.init(
    {
      optionSizeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      count: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OptionSize',
    }
  );

  return OptionSize;
};
