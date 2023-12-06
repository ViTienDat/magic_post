"Transport strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transport extends Model {
    static associate(models) {
      Transport.belongsTo(models.Order, {
        foreignKey: "order_id",
        targetKey: "id",
      }),
        Transport.belongsTo(models.Point, {
          foreignKey: "point_sender_id",
          targetKey: "id",
        });
      Transport.belongsTo(models.Point, {
        foreignKey: "point_receiver_id",
        targetKey: "id",
      });
    }
  }
  Transport.init(
    {
      order_id: DataTypes.INTEGER,
      point_sender_id: DataTypes.INTEGER,
      point_receiver_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transport",
    }
  );
  return Transport;
};
