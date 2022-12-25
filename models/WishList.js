'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      // this.hasMany(models.Item, { foreignKey: 'itemId' });
    }
  }

  WishList.init(
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
      modelName: 'WishList',
    }
  );

  return WishList;
};
