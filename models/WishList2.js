'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WishList2 extends Model {
    static associate(models) {
      this.hasOne(models.User, { foreignKey: 'userId' });
      // this.hasMany(models.Item, { foreignKey: 'itemId' });
      this.belongsToMany(models.Item2, {
        foreignKey: 'wishListId',
        through: 'WishListItem',
      });
    }
  }

  WishList2.init(
    {
      // 모델 속성은 여기서 정의됩니다. row(행, 가로) 부분임
      wishListId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: 'WishList2',
    }
  );

  return WishList2;
};
