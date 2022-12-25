'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Item2, { foreignKey: 'categoryId' });
      this.belongsTo(models.Theme, { foreignKey: 'themeId' });
    }
  }

  Category.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      category: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true, // 중복되면 안되니까 유니크한 값입니다.
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  return Category;
};
