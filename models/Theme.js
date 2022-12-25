'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {
      this.hasMany(models.Category, { foreignKey: 'themeId' });
      this.belongsTo(models.Gender, { foreignKey: 'genderId' });
    }
  }

  Theme.init(
    {
      themeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      theme: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true, // 중복되면 안되니까 유니크한 값입니다.
      },
    },
    {
      sequelize,
      modelName: 'Theme',
    }
  );

  return Theme;
};
