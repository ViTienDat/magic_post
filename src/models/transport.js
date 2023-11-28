"Transport strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transport extends Model {
    static associate(models) {}
  }
  Transport.init(
    {
      name: DataTypes.STRING,
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
