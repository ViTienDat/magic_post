const db = require("../models");

//tạo điểm giao dịch hoặc điểm tập kết
// em nhớ ghi rõ cái type là dg || tk chứ a hơi lười tạo bảng mới rồi gán khóa phụ :D
const createPoint = async (req, res) => {
  try {
    const { name, address, type } = req.body;
    const response = await db.Point.create({
      name,
      address,
      type,
    });
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const updatePoint = async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, address, type } = req.body;
    // if (!name || !address || !type) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Nhập thiếu dữ liệu",
    //   });
    // }
    const response = await db.Point.update(
      {
        name,
        address,
        type,
      },
      {
        where: { id: pid },
      }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
    });
  } catch (error) {
    throw new Error(error);
  }
};

const deletePoint = async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await db.Point.destroy({
      where: { id: pid },
      raw: true,
    });
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getPoint = async (req, res) => {
  try {
    const response = await db.Point.findAll();
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createPoint,
  updatePoint,
  deletePoint,
  getPoint,
};
