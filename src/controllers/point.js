const db = require("../models");

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

module.exports = {
  createPoint,
};
