'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // this.hasOne(models.ItemOption, { foreignKey: 'itemOptionId' });
      // this.hasOne(models.ItemInformation, { foreignKey: 'itemInformationId' });
      // this.belongsTo(models.WishList, { foreignKey: 'wishListId' });
      // this.belongsTo(models.Cart, { foreignKey: 'cartId' });
      // this.belongsTo(models.OrderList, { foreignKey: 'orderListId' });
    }
  }

  Item.init(
    {
      itemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        // references: {
        //   model: 'ItemOption', // ItemOption 테이블에
        //   key: 'itemId', // itemId colum괴 관계를 맺음
        // },
        // //* 이거 2개 쓰는거 가능한가?, references는 정확이 어떤 역할을 하는가? (sequelize model references)
        // references: {
        //   model: 'ItemInformation',
        //   key: 'itemId',
        // },
        //! 1:1 관계에서 사용하는 것은 아닌것 같음
        // CASCADE: 1:N 관계의 테이블에서 1의 데이터를 지우면 관련된 N을 지우게 된다.
        // onDelete: 'CASCADE', // 관련된 데이터를 삭제하는데 용이하다.
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thema: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );

  return Item;
};
