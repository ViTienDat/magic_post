"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "user_id", targetKey: "id" });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      sender_name: DataTypes.STRING,
      receiver_name: DataTypes.STRING,
      sender_address: DataTypes.STRING,
      receiver_address: DataTypes.STRING,
      sender_phone: DataTypes.STRING,
      receiver_phone: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.STRING,
      price: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
