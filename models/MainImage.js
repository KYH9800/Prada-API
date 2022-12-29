'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MainImage extends Model {
    static associate(models) {
      this.belongsTo(models.Item, { foreignKey: 'itemId' });
    }
  }

  MainImage.init(
    {
      mainImageId: {
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
      modelName: 'MainImage',
    }
  );

  return MainImage;
};
