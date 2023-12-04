"point strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    static associate(models) {
      // Point.hasMany(models.User, { foreignKey: "point_id" });
    }
  }
  Point.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Point",
    }
  );
  return Point;
};
