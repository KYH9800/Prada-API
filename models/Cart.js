'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // this.hasMany(models.Item, { foreignKey: 'itemId' });
      // this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Cart.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'User',
      //     key: 'userId',
      //   },
      //   onDelete: 'CASCADE', //! 이거 확인하기: 따라서 삭제가 되는지
      // },
      // itemId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'Item',
      //     key: 'itemId',
      //   },
      //   onDelete: 'CASCADE', //! 이거 확인하기: 따라서 삭제가 되는지
      // },
      count: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );

  return Cart;
};
