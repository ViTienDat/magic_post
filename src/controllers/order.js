const db = require("../models");

//cho giao dịch viên
// truyền đủ bằng này cái
// sender_name ||
// receiver_name ||
// sender_address ||
// receiver_address ||
// sender_phone ||
// receiver_phone ||
// type
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
      type,
    } = req.body;
    if (
      !sender_name ||
      !receiver_name ||
      !sender_address ||
      !receiver_address ||
      !sender_phone ||
      !receiver_phone ||
      !type
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
      type,
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
// truyền order_id vào params
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
// order => params
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

// xác nhận hàng chuyển đến tay người nhận
// order_id => params
const completedOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Nhập thiếu dữ liệu",
      });
    }
    const response = await db.Order.update(
      {
        status: "completed",
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "completed" : "wrong",
    });
  } catch (error) {
    throw new Error(error);
  }
};

// xác nhận đơn hàng không chuyển đến tay người nhận
const wrongOrder = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Nhập thiếu dữ liệu",
      });
    }
    const response = await db.Order.update(
      {
        status: "wrong",
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "completed" : "wrong",
    });
  } catch (error) {
    throw new Error(error);
  }
};

// lấy order theo user
// chức năng cho user tra cứu đơn hàng của mình
const getOrderByUser = async (req, res) => {
  try {
    const uid = req.user.id;
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

module.exports = {
  createOrder,
  deleteOrder,
  getOrderDetail,
  getOrderByUser,
  getAllOrder,
  completedOrder,
  wrongOrder,
};
