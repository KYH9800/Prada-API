'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    static associate(models) {
      this.hasMany(models.Theme, { foreignKey: 'genderId' });
    }
  }

  Gender.init(
    {
      genderId: {
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
    },
    {
      sequelize,
      modelName: 'Gender',
    }
  );

  return Gender;
};
