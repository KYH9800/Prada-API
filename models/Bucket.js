'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bucket extends Model {
    static associate(models) {
      this.hasMany(models.Item, { foreignKey: 'itemId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Bucket.init(
    {
      bucketId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
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
      count: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Bucket',
    }
  );

  return Bucket;
};
