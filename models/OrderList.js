'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderList extends Model {
    static associate(models) {
      this.hasOne(models.User, { foreignKey: 'userId' });

      this.belongsToMany(models.Item, {
        foreignKey: 'orderListId',
        through: 'OrderListItem',
      });
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
