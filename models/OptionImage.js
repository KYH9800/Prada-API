'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OptionImage extends Model {
    static associate(models) {
      this.belongsTo(models.Item, { foreignKey: 'itemId' });
    }
  }

  OptionImage.init(
    {
      optionImageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      src: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OptionImage',
    }
  );

  return OptionImage;
};
