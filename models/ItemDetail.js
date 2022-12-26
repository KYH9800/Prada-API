'use strict'; //
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
        unique: true, // 중복되면 안되니까 유니크한 값입니다.
      },
      theme: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true, // 중복되면 안되니까 유니크한 값입니다.
      },
      category: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true, // 중복되면 안되니까 유니크한 값입니다.
      },
    },
    {
      sequelize,
      modelName: 'ItemDetail',
    }
  );

  return ItemDetail;
};
