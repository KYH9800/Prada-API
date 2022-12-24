'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WishList extends Model {
    static associate(models) {
      this.hasMany(models.Item, { foreignKey: 'itemId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE', //! 이거 확인하기: 따라서 삭제가 되는지
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Item',
          key: 'itemId',
        },
        onDelete: 'CASCADE', //! 이거 확인하기: 따라서 삭제가 되는지
      },
    },
    {
      sequelize,
      modelName: 'WishList',
    }
  );

  return WishList;
};
