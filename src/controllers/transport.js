const db = require("../models");

// tạo đơn chuyển giữa các điểm tập kết và điểm giao hàng
// truyền order_id, point_receiver_id vào body
const crreateTp = async (req, res) => {
  try {
    const { order_id, point_receiver_id } = req.body;
    const point_sender_id = req.user.point_id;
    if (!order_id || !point_receiver_id) {
      return res.status(401).json({
        success: false,
        message: "Nhập thiếu dữ liệu",
      });
    }
    const response = await db.Transport.create(
      {
        order_id,
        point_receiver_id,
        point_sender_id,
      },
      {
        raw: true,
      }
    );
    console.log(response);
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "completed" : "wrong",
      data: response,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// lấy các đơn giao
const getTpSendByStaff = async (req, res) => {
  try {
    const pid = req.user.point_id;
    const response = await db.Transport.findAll({
      where: { point_sender_id: pid },
      include: [
        { model: db.Order, attributes: ["id", "user_id", "status", "type"] },
      ],
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

// lấy các đơn hàng nhận
const getTpReciveByStaff = async (req, res) => {
  try {
    const pid = req.user.point_id;
    const response = await db.Transport.findAll({
      where: { point_receiver_id: pid },
      include: [
        { model: db.Order, attributes: ["id", "user_id", "status", "type"] },
      ],
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

//xác nhận đơn hàng dã thành công
// truyền tid vào params
const completedTp = async (req, res) => {
  try {
    const { tid } = req.params;
    const point_receiver = req.user.point_id;
    const tp = await db.Transport.findOne({
      where: { id: tid },
      raw: true,
    });
    if (tp.point_receiver_id !== point_receiver) {
      return res.status(401).json({
        success: false,
        message: "wrong",
      });
    }

    const response = await db.Transport.update(
      { status: "completed" },
      { where: { id: tid } }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "completed" : "wrong",
    });
  } catch (error) {
    throw new Error(error);
  }
};

//xác nhận đơn hàng đã thất bại
const wrongTp = async (req, res) => {
  try {
    const { tid } = req.params;
    const point_receiver = req.user.point_id;
    const tp = await db.Transport.findOne({
      where: { id: tid },
      raw: true,
    });
    if (tp.point_receiver_id !== point_receiver) {
      return res.status(401).json({
        success: false,
        message: "wrong",
      });
    }

    const response = await db.Transport.update(
      { status: "wrong" },
      { where: { id: tid } }
    );

    await db.Order.update(
      {
        status: "wrong",
      },
      {
        where: { id: tp.order_id },
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

module.exports = {
  crreateTp,
  getTpSendByStaff,
  getTpReciveByStaff,
  completedTp,
  wrongTp,
};
