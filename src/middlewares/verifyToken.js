const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      console.log("khong co token");
      return res.status(401).json({
        success: false,
        mes: "Bạn chưa đăng nhập",
      });
    }
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("token loi");
        return notAuth("token không chính xác hoặc hết hạn", res);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    throw new Error(error);
  }
};

const isManager = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "manager") {
      return res.status(401).json({
        success: false,
        message: "Bạn không có chức năng này",
      });
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
};

const isLeader = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "leader" && role !== "manager") {
      return res.status(401).json({
        success: false,
        message: "Bạn không có chức năng này",
      });
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
};

const isStaff = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "staff") {
      return res.status(401).json({
        success: false,
        message: "Bạn không có chức năng này",
      });
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  verifyToken,
  isManager,
  isLeader,
  isStaff,
};
