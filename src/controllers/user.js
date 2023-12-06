const db = require("../models");
const bcrypt = require("bcryptjs");
const createToken = require("../middlewares/jwt");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Tạo tài khoản người dùng (user)
// em truyền các biến: name, email, password, phone, address
const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      throw new Error("Nhập nhiếu dữ liệu");
    }

    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        password: hashPassword(password),
        phone,
        address,
        role: "user",
      },
    });
    return res.status(200).json({
      success: created ? true : false,
      message: created ? "completed" : "wrong",
      data: user,
    });
  } catch (error) {
    throw new Error(error);
  }
};

//login
// truyền email, password
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Nhập nhiếu dữ liệu");
    }
    const response = await db.User.findOne({
      where: { email },
      raw: true,
    });

    const checkPassword =
      response && bcrypt.compareSync(password, response.password);
    const token = checkPassword
      ? createToken(
          response.id,
          response.email,
          response.role,
          response.point_id
        )
      : null;

    return res.status(200).json({
      success: token ? true : false,
      message: token ? "Đăng nhập thành công" : "Sai mật khẩu hoặc tài khoản",
      token: token,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// tạo leader
// truyền name, email, password, phone, address, namePoint(tên của điểm giao dịch hoặc điểm tập kết)
const createLeader = async (req, res) => {
  try {
    const { name, email, password, phone, address, namePoint } = req.body;
    const point = await db.Point.findOne({
      where: { name: namePoint },
      raw: true,
    });
    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        password: hashPassword(password),
        phone,
        role: "leader",
        address,
        point_id: point.id,
      },
    });

    return res.status(200).json({
      success: created,
      message: created ? "completed" : "wrong",
      data: user,
    });
  } catch (error) {
    throw new Error(error);
  }
};

// update leader
//em cx truyền tương tự như user là được
const updateLeader = async (req, res) => {
  try {
    const { email, ...body } = req.body;
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Thiếu dữ liệu",
      });
    }

    const response = await db.User.update(body, {
      where: { email },
    });

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "completed" : "wrong",
    });
  } catch (error) {
    throw new Error(error);
  }
};

// lấy danh sách leader
const getAllLeader = async (req, res) => {
  try {
    const response = await db.User.findAll({
      where: { role: "leader" },
      raw: true,
      nest: true,
      include: [{ model: db.Point, attributes: ["name", "type"] }],
      attributes: ["id", "name", "email", "role", "address"],
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

//lấy leader details
//truyền user_id vào params
const getLeader = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(401).json({
        success: false,
        message: "Nhập thiếu dữ liệu",
      });
    }
    const response = await db.User.findOne({
      where: { id: uid, role: "leader" },
      nest: true,
      include: [{ model: db.Point, attributes: ["name", "type"] }],
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

//xóa leader
//truyền user_id vào params
const deleteLeader = async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(401).json({
        success: false,
        message: "Nhập thiếu dữ liệu",
      });
    }
    const response = await db.User.destroy({
      where: { id: uid },
    });
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "completed" : "wrong",
    });
  } catch (error) {
    throw new Error(error);
  }
};

//tạo nhân viên
// name, email, password, phone, address
const createStaff = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const point = req.user.point_id;
    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        password: hashPassword(password),
        phone,
        role: "staff",
        address,
        point_id: point,
      },
    });
    return res.status(200).json({
      success: created,
      message: created ? "completed" : "wrong",
      data: user,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUser,
  login,
  createLeader,
  createStaff,
  updateLeader,
  getAllLeader,
  deleteLeader,
  getLeader,
};
