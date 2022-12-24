'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderList extends Model {
    static associate(models) {
      // this.hasMany(models.Item, { foreignKey: 'itemId' });
      // this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  OrderList.init(
    {
      // 모델 속성은 여기서 정의됩니다. row(행, 가로) 부분임
      orderListId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // itemId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Item',
      //     key: 'itemId',
      //   },
      //   onDelete: 'CASCADE', //! 이거 확인하기: 따라서 삭제가 되는지
      // },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'User',
      //     key: 'userId',
      //   },
      //   onDelete: 'CASCADE', //! 이거 확인하기: 따라서 삭제가 되는지
      // },
      orderNum: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderList',
    }
  );

  return OrderList;
};
