'use strict'; 
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItemDetail extends Model {
    static associate(models) {
      this.hasMany(models.Item, { foreignKey: 'itemDetailId' });
    }
  }

  ItemDetail.init(
    {
      itemDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ItemDetail',
    }
  );

  return ItemDetail;
};
