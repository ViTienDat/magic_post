const db = require("../models");

//cho giao dịch viên
const createOrder = async (req, res) => {
  try {
    const {
      userEmail,
      sender_name,
      receiver_name,
      sender_address,
      receiver_address,
      sender_phone,
      receiver_phone,
      description,
      price,
    } = req.body;
    if (
      !sender_name ||
      !receiver_name ||
      !sender_address ||
      !receiver_address ||
      !sender_phone ||
      !receiver_phone
    ) {
      return res.status(401).json({
        success: false,
        message: "Nhập thiếu dữ liệu",
      });
    }
    const user = await db.User.findOne({
      where: { email: userEmail },
      raw: true,
    });

    console.log(price);
    const order = await db.Order.create({
      user_id: user?.id ? user?.id : null,
      sender_name,
      receiver_name,
      sender_address,
      receiver_address,
      sender_phone,
      receiver_phone,
      description,
      price: price == "" ? "30000" : price,
    });
    return res.status(200).json({
      success: order ? true : false,
      message: order ? "completed" : "wrong",
      data: order,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// xóa order
const deleteOrder = async (req, res) => {
  try {
    const { oid } = req.params;
    if (!oid) {
      return res.status(401).json({
        success: false,
        message: "Nhập thiếu dữ liệu",
      });
    }
    const order = await db.Order.destroy({
      where: { id: oid },
    });
    return res.status(200).json({
      success: order ? true : false,
      message: order ? "completed" : "wrong",
    });
  } catch (error) {
    throw new Error(error);
  }
};

// lấy chi tiết order
const getOrderDetail = async (req, res) => {
  try {
    const { oid } = req.params;
    if (!oid) {
      return res.status(401).json({
        success: false,
        message: "Nhập thiếu dữ liệu",
      });
    }
    const order = await db.Order.findOne({
      nest: true,
      include: [{ model: db.User, attributes: ["name", "email", "phone"] }],
      where: { id: oid },
    });
    return res.status(200).json({
      success: order ? true : false,
      message: order ? "completed" : "wrong",
      data: order,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// lấy order theo user
// chức năng cho user tra cứu đơn hàng của mình
const getOrderByUser = async (req, res) => {
  try {
    const response = await db.Order.findAll({
      nest: true,
      include: [{ model: db.User, attributes: ["name", "email", "phone"] }],
      where: { user_id: uid },
      raw: true,
    });
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "completed" : "wrong",
      data: response,
    });
  } catch (error) {
    throw new Error(error);
  }
};

//lấy all order
const getAllOrder = async (req, res) => {
  try {
    const response = await db.Order.findAll({
      nest: true,
      include: [{ model: db.User, attributes: ["name", "email", "phone"] }],
      raw: true,
    });
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "completed" : "wrong",
      data: response,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createOrder,
  deleteOrder,
  getOrderDetail,
  getOrderByUser,
  getAllOrder,
};
